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
    <div>
      <h1 className="text-center">TODOIST</h1>
      <div className="home">
        {categories.map((category, index) => {
          return (
            <div key={category} className="card text-dark text-center my-1" style={{ backgroundColor: '#A0A0A0', width: '18rem' }}>
              <Link to={`/${category}`}>
                <h4 className="card-title text-white">
                  {index + 1}. {category}
                </h4>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
