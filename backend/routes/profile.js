const express = require('express')
const router = express.Router()
const server = require('../server')
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')

const { authUser } = require('../middleware/middleware')

router.patch('/credits', authUser, (req, res) => {
  mySql.query('UPDATE users SET userCredits=? WHERE userId=?', [req.body.credits, req.user.userId], (err) => {
    if (err) return res.send({ status: 3, msg: err })

    return res.send({ status: 1, msg: 'Credits set to ' + req.body.credits + '!' })
  })
})

module.exports = router