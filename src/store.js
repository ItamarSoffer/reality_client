import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './Reducers/sitesReducer';
import usersReducer from './Reducers/usersReducer';
<<<<<<< HEAD
=======
import modalsReducer from './Reducers/modalsReducer';
import eventsReducer from './Reducers/eventsReducer';

>>>>>>> 8a372ee... add, edit and del event dont fetch all

const store = createStore(
    combineReducers({
        sitesReducer,
<<<<<<< HEAD
        usersReducer
=======
        usersReducer,
        modalsReducer,
        eventsReducer
>>>>>>> 8a372ee... add, edit and del event dont fetch all
    }),
    {},
    applyMiddleware(thunk)
);

export default store;