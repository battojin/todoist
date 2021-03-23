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
    <div className="card">
      <div className="card-body">
        <button type="button" className="btn btn-info" onClick={editClick}>
          {editMode ? 'Save' : 'Edit'}
        </button>

        {editMode && (
        <input
          type="text"
          onChange={onChange}
          value={Title}
        />
        )}
        {!editMode && (
        <>
          <h5 className="mr-1 my-1">{task.title}</h5>
          <p className="mb-0 fs-6">{task.status}</p>
        </>
        )}
        <div className="btn-group mt-3" role="group">
          <button
            type="button"
            className="btn btn-warning m-1"
            onClick={() => dispatch(changeStatus(category, task.taskId, status))}
          >
            {status}
          </button>
          <button
            type="button"
            className="btn btn-warning m-1"
            onClick={() => dispatch(changeStatus(category, task.taskId, blocked))}
          >
            {blocked}
          </button>
          <button
            type="button"
            className="btn btn-warning m-1"
            onClick={() => dispatch(deleteTask(category, task.taskId))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task
