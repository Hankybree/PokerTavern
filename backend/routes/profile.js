const express = require('express')
const router = express.Router()
const server = require('../server')
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')

const { authUser } = require('../middleware/middleware')

router.patch('/addcredits', authUser, (req, res) => {
  mySql.query('UPDATE users SET userCredits=userCredits+? WHERE userId=?', [req.body.credits, req.user.userId], (err) => {
    if (err) return res.send({ status: 3, msg: err })

    return res.send({ status: 1, msg: req.body.credits + ' credits added!' })
  })
})

module.exports = router