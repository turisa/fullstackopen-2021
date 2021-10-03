import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({ blogs: blogReducer, user: userReducer });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
