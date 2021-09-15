const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const likes = blogPosts.reduce((a, b) => a.likes + b.likes, { likes: 0 });
  return likes;
};

module.exports = {
  dummy,
  totalLikes,
};
