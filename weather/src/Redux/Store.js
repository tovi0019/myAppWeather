import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import dataReducer from './Reducer/dataReducer'


const reducer = combineReducers({dataReducer});

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware()))
window.store = store

export default store;