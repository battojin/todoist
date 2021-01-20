import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import taskReducer from './taskReducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  taskReducer
})

export default createRootReducer
