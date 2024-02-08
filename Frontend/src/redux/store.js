import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import {
    thunk
} from 'redux-thunk';
// import thunk from 'redux-thunk/dist/redux-thunk.esm.js';

import {
    compose
} from 'redux';
import {
    userRegistrationReducer
} from './reducers/userRegistrationReducer';
import {
    authReducer
} from './reducers/authReducer';
import {
    getAllConversationList
} from './reducers/conversationListReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    registration: userRegistrationReducer,
    auth: authReducer,
    conversations: getAllConversationList
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store