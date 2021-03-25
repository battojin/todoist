import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeStatus, changeTitle, deleteTask } from '../redux/reducers/taskReducer'

const Task = ({ task, category }) => {
  const [editMode, setEditMode] = useState(false)
  const [Title, setTitle] = useState(task.title)
  const dispatch = useDispatch()
  const onChange = (e) => {
    setTitle(e.target.value)
  }
  const editClick = () => {
    if (editMode) {
      dispatch(changeTitle(category, task.taskId, Title))
    }
    setEditMode(!editMode)
  }
  const blocked = task.status === 'Blocked' ? 'In progress' : 'Blocked'

  let status
  switch (task.status) {
    case 'New':
    case 'Done': {
      status = 'In progress'
      break
    }
    case 'In progress':
    case 'Blocked': {
      status = 'Done'
      break
    }
    default:
      status = 'In progress'
  }

  return (
    <div className="card mb-1">
      <div className="card-body">
        {editMode && (
        <input
          type="text"
          onChange={onChange}
          value={Title}
        />
        )}
        {!editMode && (
        <div>
          <h5 className="text-dark mr-1 mb-2">{task.title}</h5>
          <p className="text-secondary mb-0 fs-6">{task.status}</p>
        </div>
        )}
        <div className="btn-group mt-3" role="group">
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={() => dispatch(changeStatus(category, task.taskId, status))}
          >
            {status}
          </button>
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={() => dispatch(changeStatus(category, task.taskId, blocked))}
          >
            {blocked}
          </button>
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={() => dispatch(deleteTask(category, task.taskId))}
          >
            Delete
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-info btn-block mt-2" onClick={editClick}>
            {editMode ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task
