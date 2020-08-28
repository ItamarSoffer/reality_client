import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './Reducers/sitesReducer';
import usersReducer from './Reducers/usersReducer';
import modalsReducer from './Reducers/modalsReducer';
import eventsReducer from './Reducers/eventsReducer';


const store = createStore(
    combineReducers({
        sitesReducer,
        usersReducer,
        modalsReducer,
        eventsReducer
    }),
    {},
    applyMiddleware(thunk)
);

export default store;