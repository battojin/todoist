import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newTask } from '../redux/reducers/taskReducer'

const AddTask = ({ category }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const onChange = (e) => setTitle(e.target.value)

  return (
    <div className="d-flex justify-content-center mt-2">
      <input type="text" className="form-text" value={title} onChange={onChange} />
      <button
        type="button"
        className="btn btn-info ml-2"
        onClick={() => dispatch(newTask(category, title))}
      >
        Add
      </button>
    </div>
  )
}

export default AddTask
