import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import {thunk} from 'redux-thunk';
// import thunk from 'redux-thunk/dist/redux-thunk.esm.js';

import { compose } from 'redux';
import {
    userRegistrationReducer
} from './reducers/userRegistrationReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    registration: userRegistrationReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store