const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bugRouter = require('./controllers/bugController')
const usersRouter = require('./controllers/userController')
const projectRouter = require('./controllers/projectController')

const DB = process.env.ATLAS_URI

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Database connected..`)
})
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/bugs', bugRouter)
app.use('/api/users', usersRouter)
app.use('/api/projects', projectRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
