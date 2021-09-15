const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  const likes = blogList.reduce((sum, blog) => {
    return sum + blogList.likes;
  }, 0);
  return likes;
};

module.exports = {
  dummy,
  totalLikes,
};
