import blogService from '../services/blogs';
import loginService from '../services/login';

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
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);

    console.log('User exists on window');

    return {
      type: 'SET_USER',
      data: user,
    };
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);

    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const logout = () => {
  window.localStorage.clear();

  return {
    type: 'RESET_USER',
  };
};

export default userReducer;
