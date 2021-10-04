import blogService from '../services/blogs';
import {
  setErrorNotification,
  setSuccessNotification,
} from './notificationReducer';
import { logout } from './userReducer';

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

      dispatch(setSuccessNotification(`added ${blog.title}`));
    } catch (exception) {
      if (exception.includes('failed with status code 400')) {
        dispatch(setErrorNotification('the blog must have a title'));
      } else if (exception.includes('failed with status code 401')) {
        dispatch(logout());
      }
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      const returned = await blogService.update(newBlog);
      console.log(returned);

      dispatch({
        type: 'UPDATE_BLOG',
        data: newBlog,
      });

      dispatch(setSuccessNotification(`liked ${blog.title}`));
    } catch (exception) {
      dispatch(logout());
    }
  };
};

export const deleteBlog = ({ title, id }) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);

      dispatch({
        type: 'DELETE_BLOG',
        data: id,
      });

      dispatch(setSuccessNotification(`deleted ${title}`));
    } catch (exception) {
      dispatch(logout());
    }
  };
};

export default blogReducer;
