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
import {
    getMessagesReducer
} from './reducers/getMessageReducer';
import {
    sendMessageReducer
} from './reducers/sendMessageReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    registration: userRegistrationReducer,
    auth: authReducer,
    conversations: getAllConversationList,
    messages: getMessagesReducer,
    sendMessage: sendMessageReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store