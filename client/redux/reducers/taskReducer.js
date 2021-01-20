import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

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
