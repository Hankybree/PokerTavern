export var isConnected = false

export function connect(tableId) {
  if (isConnected) {
    alert('You are already connected to a game!')
    return
  }
  const token = localStorage.getItem('token').split(' ')[1]
  let socket = new WebSocket('ws://195.201.32.3:4000/' + tableId, token)

  socket.onopen = () => {
    console.log('Connected')
    isConnected = true
    socket.send({ status: 1 })
  }

  socket.onmessage = (message) => {
    console.log(JSON.parse(message.data))
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

