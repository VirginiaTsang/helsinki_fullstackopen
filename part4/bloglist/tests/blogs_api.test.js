const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () =>{
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('view all Blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const resultBlogFromApp = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(blogsAtStart.length, resultBlogFromApp.body.length)
})

test('view a specific Blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlogFromApp = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlogFromApp.body, blogToView)
})

test('add a Blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const tempBlog = {
    title: "temptitle",
    author: "tempauthor",
    url: "someurl",
    likes: 9
  }

  await api
    .post(`/api/blogs`)
    .send(tempBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(blogsAtStart.length+1, response.body.length)
  assert(titles.includes('temptitle'))
})

test('default likes to 0 if no likes property', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const tempBlog = {
    title: "temptitle",
    author: "tempauthor",
    url: "someurl"
  }

  const result = await api
    .post(`/api/blogs`)
    .send(tempBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(result.body.likes, 0)
})

test('status code 400 for missing title or url', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const noTitleBlog = {
    author: "noTitleAuthor",
    url: "noTitleUrl",
    likes: 9
  }

  const noUrlBlog = {
    title: "noUrlTitle",
    author: "noUrlAuthor",
    likes: 9
  }

  await api
    .post(`/api/blogs`)
    .send(noTitleBlog)
    .expect(400)
  
  await api
    .post(`/api/blogs`)
    .send(noUrlBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const toDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${toDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length-1, blogsAtEnd.length)
})

test('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const toUpdate = blogsAtStart[0]

  toUpdate.likes = 500

  const updatedBlogInDb = await api
    .put(`/api/blogs/${toUpdate.id}`)
    .send(toUpdate)
    .expect(200)

  assert.strictEqual(updatedBlogInDb.body.likes, 500)

})
after(async () => {
  await mongoose.connection.close()
})

