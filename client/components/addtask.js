import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newTask } from '../redux/reducers/taskReducer'

const AddTask = ({ category }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const onChange = (e) => setTitle(e.target.value)

  return (
    <div className="addtask">
      <input type="text" value={title} onChange={onChange} />
      <button
        type="button"
        onClick={() => dispatch(newTask(category, title))}
      >
        Add
      </button>
    </div>
  )
}

export default AddTask
