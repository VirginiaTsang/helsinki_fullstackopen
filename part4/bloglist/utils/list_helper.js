const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, curVal)=> sum + curVal.likes, 0)
}
const mostLikes = (blogs) => {
  return blogs.reduce((maxBlog, curBlog)=> (curBlog.likes > maxBlog.likes? curBlog: maxBlog), blogs[0])
}

module.exports = {
  dummy, totalLikes, mostLikes
}