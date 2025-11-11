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

module.exports = blogsRouter