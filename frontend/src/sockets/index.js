import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.connected = false
  }

  connect() {
    if (this.socket && this.connected) {
      return this.socket
    }

    const token = localStorage.getItem('token')

    const isProduction = import.meta.env.PROD
    const url = isProduction
      ? window.location.origin
      : 'http://localhost:5001'

    this.socket = io(url, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on('connect', () => {
      this.connected = true
    })

    this.socket.on('connect_error', () => {
      // silent error
    })

    this.socket.on('disconnect', () => {
      this.connected = false
    })

    return this.socket
  }

  disconnect() {
    if (this.socket && this.connected) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }
}

export default new SocketService()
