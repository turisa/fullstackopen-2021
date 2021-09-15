const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const likes = blogPosts.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return likes;
};

module.exports = {
  dummy,
  totalLikes,
};
