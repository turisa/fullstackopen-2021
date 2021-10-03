import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      const initialBlogs = action.data;

      return initialBlogs;
    case 'CREATE_BLOG':
      const newBlog = action.data;

      return state.concat(newBlog);
    case 'UPDATE_BLOG':
      const updatedBlog = action.data;

      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    case 'DELETE_BLOG':
      const id = action.data;

      return state.filter((blog) => blog.id !== id);
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

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const newBlog = await blogService.create(blog);
      const { name, username } = getState().user;

      dispatch({
        type: 'CREATE_BLOG',
        data: { ...newBlog, user: { name, username, id: newBlog.id } },
      });
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(newBlog);

    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);

    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export default blogReducer;
