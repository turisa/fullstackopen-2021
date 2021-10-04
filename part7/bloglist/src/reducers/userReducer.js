import blogService from '../services/blogs';
import loginService from '../services/login';
import { resetNotification, setErrorNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('The action has been dispatched');
      return action.data;
    case 'RESET_USER':
      return null;
    default:
      return state;
  }
};

export const loadUserFromWindow = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);

      console.log('User exists on window');

      dispatch({
        type: 'SET_USER',
        data: user,
      });
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      dispatch(resetNotification());

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch({
        type: 'SET_USER',
        data: user,
      });
    } catch (exception) {
      dispatch(setErrorNotification('invalid username or password'));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear();

    dispatch(resetNotification());

    dispatch({
      type: 'RESET_USER',
    });
  };
};

export default userReducer;
