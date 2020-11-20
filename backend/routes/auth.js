const express = require('express')
const router = express.Router()
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')
const { authUser } = require('../middleware/middleware')

router.get('/validate', authUser, (req, res) => {
  return res.send({ status: 1, msg: 'Session valid!' })
})

router.post('/login', (req, res) => {
  mySql.query('SELECT * FROM users WHERE userName=?', [req.body.userName], (err, users) => {
    if (err) throw err

    if (users.length === 0) {
      return res.send({ status: 2, msg: 'Incorrect username or password' })
    }

    if (users[0].userPassword === req.body.userPassword) {
      const token = jwt.sign({ userName: users[0].userName, userId: users[0].userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

      delete users[0].userPassword

      return res.send({ status: 1, msg: 'Logged in!', token, user: users[0] })
    } else {
      return res.send({ status: 2, msg: 'Incorrect username or password' })
    }
  })
})

router.post('/signup', (req, res) => {
  if (req.body.userName == undefined || req.body.userPassword == undefined) {
    return res.send({ status: 3, msg: 'Fill out username and password' })
  }

  if (req.body.userName.length < 6 || req.body.userPassword.length < 6) {
    return res.send({ status: 3, msg: 'Username and password must be atleast 6 characters' })
  }

  mySql.query('SELECT * FROM users WHERE userName=?', [req.body.userName], (err, users) => {
    if (err) throw err

    if (users.length != 0) {
      return res.send({ status: 2, msg: 'User already exist' })
    }

    mySql.query('INSERT INTO users (userName, userPassword) VALUES (?, ?)', [req.body.userName, req.body.userPassword], (err) => {
      if (err) throw err

      return res.send({ status: 1, msg: 'User created!' })
    })
  })
})

module.exports = router