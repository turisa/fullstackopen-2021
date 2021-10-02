import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';

const store = createStore(blogReducer, applyMiddleware(thunk));

export default store;
