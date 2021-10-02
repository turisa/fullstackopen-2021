import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  let blogs;

  switch (action.type) {
    case 'INIT_BLOGS':
      blogs = action.data;
      return blogs;
    case 'UPVOTE_BLOG':
      const upvotedBlog = action.data;

      blogs = state.map((blog) =>
        blog.id === upvotedBlog.id ? upvotedBlog : blog
      );
      return blogs;
    case 'DELETE_BLOG':
      const id = action.data;

      blogs = state.filter((blog) => blog.id !== id);
      return blogs;
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(newBlog);

    return dispatch({
      type: 'UPVOTE_BLOG',
      data: returnedBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);

    return dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export default blogReducer;
