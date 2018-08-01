import { createStore, applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise-middleware';

import songReducer from './ducks/songReducer';

/*
 *  This component sets up the store
 *  This is where the reducer will live
 *  The store is responsible for containing important data that will be used by multiple components
 */

const middleware =  applyMiddleware(promiseMiddleWare());

const store = createStore(songReducer, middleware);

export default store;