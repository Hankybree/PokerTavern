const express = require('express')
const router = express.Router()
const server = require('../server')
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')
const WebSocketServer = require('ws').Server

const { authUser } = require('../middleware/middleware')

const wss = new WebSocketServer({ server })

let clients = []

wss.on('connection', (socket, req) => {
  let authData = authSession(req)

  if (authData && authData === -1) {
    console.log('Invalid session')
    socket.close()
    return
  }

  console.log(req.socket.remoteAddress + ' has connected')
  console.log(wss.clients.size + ' clients connected')

  socket.user = req.user.userName
  clients.push(socket)

  socket.onmessage = (message) => {
    clients.forEach(client => {
      client.send(socket.user + '|' + message.data)
    })
  }

  socket.onclose = () => {
    console.log(req.socket.remoteAddress + ' has disconnected')
    console.log(wss.clients.size + ' clients connected')

    clients.splice(clients.indexOf(socket), 1)
    socket.close()
  }
})

function authSession(req) {
  const token = req.headers['authorization']
  if (!token) return -1 

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return -1
    req.user = user
  })
}

module.exports = router