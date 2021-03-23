/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../redux/reducers/taskReducer'
import Task from './task'
import AddTask from './addtask'

const Category = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const tasks = useSelector((store) => store.taskReducer.taskList)

  useEffect(() => {
    dispatch(getTasks(category))
  }, [category, dispatch])

  return (
    <div>
      <div>
        <div className="container">
          {tasks.map((item) => (
            <Task key={item.taskId} task={item} category={category} />
          ))}
          <AddTask category={category} />
          <div className="d-flex justify-content-center">
            <Link className="btn btn-info mt-3" style={{ textDecoration: 'none' }} to="/">Go back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
