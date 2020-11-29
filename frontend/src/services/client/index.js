export function hostGame() {

}

export function connect(tableId) {
  const token = localStorage.getItem('token').split(' ')[1]
  let socket = new WebSocket('ws://localhost:4000/' + tableId, token)

  socket.onopen = () => {
    socket.send('Hello server')
  }

  socket.onmessage = (message) => {
    console.log(message.data)
    socket.send('EXIT')
  }

  socket.onclose = () => {
    socket.close()
    console.log('Disconnected')
  }
}

export function disconnect() {

}

export function write(message) {

}

export function read() {

}

