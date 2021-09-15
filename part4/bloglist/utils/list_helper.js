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

const mostBlogs = (blogList) => {
  const authorBlogCount = {};

  blogList.forEach((blog) => authorBlogCount[blog.author]++);
  const author = Math.max(...Object.values(authorBlogCount));

  return author;
};

const mostLikes = (blogList) => {
  //todo
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
