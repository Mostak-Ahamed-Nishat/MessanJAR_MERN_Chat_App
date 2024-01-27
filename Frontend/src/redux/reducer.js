import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'


import {thunk} from 'redux-thunk';

console.log(thunk);
const rootReducer = combineReducers({})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store