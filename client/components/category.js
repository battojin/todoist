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
    <div className="container my-3">
      <h1 className="text-center">{category.toUpperCase()}</h1>
      {tasks.map((item) => (
        <Task key={item.taskId} task={item} category={category} />
      ))}
      <AddTask category={category} />
      <div className="d-flex justify-content-center">
        <Link className="btn mt-3" style={{ textDecoration: 'none' }} to="/">Go back</Link>
      </div>
    </div>
  )
}

export default Category
