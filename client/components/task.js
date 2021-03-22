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
  const blocked = task.status === 'blocked' ? 'in progress' : 'blocked'

  let status
  switch (task.status) {
    case 'new':
    case 'done': {
      status = 'in progress'
      break
    }
    case 'in progress':
    case 'blocked': {
      status = 'done'
      break
    }
    default:
      status = 'in progress'
  }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <button type="button" className="btn btn-info" onClick={editClick}>
          {editMode ? 'save' : 'edit'}
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
          <div>{task.title}</div>
          <div>{task.status}</div>
        </>
        )}

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
  )
}

export default Task
