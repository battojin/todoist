/* eslint-disable no-console */
import express from 'express'

require('dotenv').config()
const { readdir } = require('fs').promises

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

server.get('/api/v1/categories', async (req, res) => {
  const categoryNames = await readdir(`${__dirname}/tasks`).then((data) => data.map((file) => file.slice(0, -5)))
  res.json(categoryNames)
})

server.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
