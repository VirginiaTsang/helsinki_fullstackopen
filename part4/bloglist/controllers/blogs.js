const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  if(blog) {
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  }else{
    response.status(404).end()
  }
})


blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url){
    return response.status(400).end()
  }
  if(!request.body.likes){
    request.body.likes = 0
  }
  const blog = new Blog(request.body)
 
 const result = await blog.save()
 response.status(201).json(result)
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newLikes = request.body.likes
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).end()
  }
  blog.likes = newLikes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)

})

module.exports = blogsRouter