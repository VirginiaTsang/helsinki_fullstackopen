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

after(async () => {
  await mongoose.connection.close()
})

