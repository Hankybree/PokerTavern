require('dotenv-flow').config()

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port: ' + process.env.PORT)
})

module.exports = server

// Routes

const authRoute = require('./routes/auth')
const tableRoute = require('./routes/table')

app.use('/auth', authRoute)
app.use('/table', tableRoute)