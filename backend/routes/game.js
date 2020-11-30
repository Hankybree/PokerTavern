const express = require('express')
const router = express.Router()
const server = require('../server')
const mySql = require('../database/mysql')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const WebSocketServer = require('ws').Server

const { authUser } = require('../middleware/middleware')

let tables = []

function authSession(req) {
  const token = req.headers['sec-websocket-protocol']
  if (!token) return -1

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return -1
    req.user = user
  })
}

server.on('upgrade', (req, socket, head) => {
  let authData = authSession(req)

  if (authData && authData === -1) {
    console.log('Invalid session')
    socket.destroy()
    return
  }

  let tableFound = false

  tables.forEach(table => {
    if (req.url === table.path) {
      table.wss.handleUpgrade(req, socket, head, (ws) => {
        table.wss.emit('connection', ws, req)
      })

      tableFound = true
    }
  })

  if (!tableFound) {
    socket.destroy()
  }
})

router.post('/host', authUser, (req, res) => {
  const tableId = uuid.v4()

  mySql.query('INSERT INTO tables (tableId, tableName, tableMaxPlayers) VALUES (?,?,?)', [tableId, req.body.name, req.body.maxPlayers], (err) => {
    if (err) return res.send({ status: 3, msg: err })

    const wss = new WebSocketServer({ noServer: true })

    const table = { wss, path: '/' + tableId, host: req.user.userName, tableId }

    tables.push(table)

    let clients = []

    wss.on('connection', (socket, req) => {
      console.log(req.socket.remoteAddress + ' has connected')
      console.log(wss.clients.size + ' clients connected')

      socket.user = req.user
      clients.push(socket)

      mySql.query('UPDATE tables SET tableActivePlayers=tableActivePlayers+1 WHERE tableId=?', [tableId], (err) => {
        if (err) console.log(err)
      })

      socket.onmessage = (message) => {
        clients.forEach(client => {
          // Send out message
          console.log(message.data)
          client.send('Hi')
        })
      }

      socket.onclose = () => {
        if (socket.user.userName === table.host) {
          console.log('Table shutdown')
          closeTable(wss, table)
        } else {
          mySql.query('UPDATE tables SET tableActivePlayers=tableActivePlayers-1 WHERE tableId=?', [tableId], (err) => {
            if (err) console.log(err)

            console.log(req.socket.remoteAddress + ' has disconnected')
            console.log(wss.clients.size + ' clients connected')
            clients.splice(clients.indexOf(socket), 1)
            socket.close()
          })
        }
      }
    })

    return res.send({ status: 1, msg: 'Table created', tableId })
  })
})

router.get('/tables', authUser, (req, res) => {
  mySql.query('SELECT * FROM tables', (err, tables) => {
    if (err) return res.send({ status: 3, msg: err })

    return res.send({ status: 1, msg: 'Success', tables })
  })
})

function closeTable(wss, table) {
  mySql.query('DELETE FROM tables WHERE tableId=?', [table.tableId], (err) => {
    if (err) console.log(err)

    wss.close()
    wss.removeAllListeners()
    tables.splice(tables.indexOf(table))
  })
}

module.exports = router