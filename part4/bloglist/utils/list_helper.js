const dummy = (blogs) => {
  return 1;
};

const favoriteBlog = (blogList) => {
  const maxLikes = Math.max(...blogList.map((blog) => blog.likes));
  const blog = blogList.find((blog) => blog.likes === maxLikes);
  return blog;
};

const totalLikes = (blogList) => {
  const likes = blogList.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return likes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
