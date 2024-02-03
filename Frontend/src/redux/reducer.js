import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'


import {
    thunk
} from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

        export default store