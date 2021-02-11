import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../redux/reducers/taskReducer'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const categories = useSelector((store) => store.taskReducer.list)

  return (
    <div className="home">
      {categories.map((category, index) => {
        return (
          <div key={category}>
            <Link style={{ textDecoration: 'none' }} to={`/${category}`} className="category-button">
              {index + 1}. {category}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Home
