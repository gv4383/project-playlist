import { createStore, applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise-middleware';

import songReducer from './ducks/songReducer';

const middleware =  applyMiddleware(promiseMiddleWare());

const store = createStore(songReducer, middleware);

export default store;