import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
