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
const gameRoute = require('./routes/game')
const profileRoute = require('./routes/profile')

app.use('/auth', authRoute)
app.use('/game', gameRoute)
app.use('/profile', profileRoute)