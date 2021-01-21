import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_TASKS = 'GET_TASKS'

const initialState = {
  list: [],
  taskList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        list: action.payload.categories
      }
    }
    case GET_TASKS: {
      return {
        ...state,
        taskList: action.payload.tasks
      }
    }
    default:
      return state
  }
}

export const getCategories = () => {
  return (dispatch) => {
    axios('/api/v1/categories').then(({ data }) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: {
          categories: data
        }
      })
    })
  }
}

export const getTasks = (category) => async (dispatch) => {
  const taskData = await axios(`/api/v1/tasks/${category}`)
  dispatch({
    type: GET_TASKS,
    payload: {
      tasks: taskData.data
    }
  })
}
