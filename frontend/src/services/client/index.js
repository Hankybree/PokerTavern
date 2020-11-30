export var isConnected = false

export function connect(tableId) {
  if (isConnected) {
    alert('You are already connected to a game!')
    return
  }
  const token = localStorage.getItem('token').split(' ')[1]
  let socket = new WebSocket('ws://localhost:4000/' + tableId, token)

  socket.onopen = () => {
    console.log('Connected')
    isConnected = true
    socket.send('Hello server')
  }

  socket.onmessage = (message) => {
    console.log(message.data)
    //socket.send('EXIT')
  }

  socket.onclose = () => {
    socket.close()
    isConnected = false
    console.log('Disconnected')
  }
}

export function disconnect() {

}

export function write(message) {

}

export function read() {

}

