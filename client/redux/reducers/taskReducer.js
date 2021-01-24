import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_TASKS = 'GET_TASKS'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_TITLE = 'CHANGE_TITLE'
const DELETE_TASK = 'DELETE_TASK'
const ADD_TASK = 'ADD_TASK'

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
    case CHANGE_STATUS: {
      return {
        ...state,
        taskList: action.payload.taskList
      }
    }
    case CHANGE_TITLE: {
      return {
        ...state,
        taskList: action.payload.taskList
      }
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskList: action.payload.taskList
      }
    }
    case ADD_TASK: {
      return {
        ...state,
        taskList: action.payload.taskList
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

export const changeStatus = (category, id, status) => {
  return (dispatch, getState) => {
    const store = getState()
    const { taskList } = store.taskReducer
    const newStatus = taskList.map((task) => (task.taskId === id ? { ...task, status } : task))
    dispatch({
      type: CHANGE_STATUS,
      payload: {
        taskList: newStatus
      }
    })
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        status
      }
    })
  }
}

export const changeTitle = (category, id, title) => {
  return (dispatch) => {
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        title
      }
    }).then(({ data }) => {
      dispatch({
        type: CHANGE_TITLE,
        payload: {
          taskList: data
        }
      })
    })
  }
}

export const deleteTask = (category, id) => {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/api/v1/tasks/${category}/${id}`
    }).then(({ data }) => {
      dispatch({
        type: DELETE_TASK,
        payload: {
          taskList: data
        }
      })
    })
  }
}

export const newTask = (category, title) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/tasks/${category}`,
      data: {
        title
      }
    }).then(({ data }) => {
      dispatch({
        type: ADD_TASK,
        payload: {
          taskList: data
        }
      })
    })
  }
}
