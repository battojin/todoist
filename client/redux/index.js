import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import createHistory from './history'

export const history = createHistory()

const initialState = {}
const middleware = [thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middleware))
const store = createStore(rootReducer(history), initialState, composedEnhancers)

export default store
