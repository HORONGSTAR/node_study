const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.addListener('dataReceived', () => {
   console.log('Hello, Node.js!')
})

myEmitter.on('dataReceived', () => {
   console.log('이벤트가 발생했습니다!')
})

myEmitter.emit('dataReceived')
