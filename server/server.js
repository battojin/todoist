/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import express from 'express'

require('dotenv').config()
const { readFile, readdir, writeFile } = require('fs').promises

const server = express()
const PORT = process.env.PORT || 8080

server.use('/static', express.static(`${__dirname}/public`))
server.use(express.json({ limit: '1000kb' }))
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

server.get('/', (req, res) => {
  res.send('Express server')
})

server.get('/api/v1/test', (req, res) => {
  res.send('API: test data')
})

// const TaskModel = {
//   taskId: '',
//   title: '',
//   _isDeleted: false,
//   _createdAt: +new Date(),
//   _deletedAt: null,
//   status: ''
// }

const toReadFile = (category) => {
  return readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' }).then((file) => JSON.parse(file))
}

const toWriteFile = (taskData, category) => writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(taskData), { encoding: 'utf8' })

const keyRemoval = (file) => {
  return file
    .filter((task) => !task._isDeleted)
    .map((object) => {
      return Object.keys(object).reduce((acc, key) => {
        if (key[0] !== '_') {
          return { ...acc, [key]: object[key] }
        }
        return acc
      }, {})
    })
}

server.get('/api/v1/categories', async (req, res) => {
  const categoryNames = await readdir(`${__dirname}/tasks`).then((data) => data.map((file) => file.slice(0, -5)))
  res.json(categoryNames)
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const data = await toReadFile(category)
    .then((file) => keyRemoval(file))
    .catch(() => {
      res.status(404)
      res.end()
    })
  res.json(data)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const { status, title } = req.body
  const taskData = await toReadFile(category).then((file) => {
    return file.map((task) => {
      return task.taskId === id
        ? { ...task, status: status || task.status, title: title || task.title }
        : task
    })
  })

  toWriteFile(taskData, category)
  res.json(taskData)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const updatedList = await toReadFile(category).then((file) => {
    return file.map((task) => {
      return task.taskId === id ? { ...task, _isDeleted: true, _deletedAt: +new Date() } : task
    })
  })

  toWriteFile(updatedList, category)
  res.json(updatedList.filter((task) => !task._isDeleted))
})
server.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
