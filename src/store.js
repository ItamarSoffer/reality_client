import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './Reducers/sitesReducer';
import usersReducer from './Reducers/usersReducer';

const store = createStore(
    combineReducers({
        sitesReducer,
        usersReducer
    }),
    {},
    applyMiddleware(thunk)
);

export default store;