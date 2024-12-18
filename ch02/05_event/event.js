const EventEmitter = require('events')

// 이벤트 객체 생성
const myEvnet = new EventEmitter()

// event1 추가
myEvnet.addListener('event1', () => {
   console.log('이벤트1')
})
// event2에 리스너 2개 추가
myEvnet.addListener('event2', () => {
   console.log('이벤트2')
})

myEvnet.on('event2', () => {
   console.log('이벤트2 추가')
})

myEvnet.once('event3', () => {
   console.log('이벤트3')
})

//이벤트 호출

myEvnet.emit('event1')
myEvnet.emit('event2')
myEvnet.emit('event3')
myEvnet.emit('event3') // 실행X(once로 등록된 이벤트는 한번만 실행 가능)

myEvnet.on('event4', () => {
   console.log('이벤트4')
})

//이벤트 제거
myEvnet.removeAllListeners('event4') // 모든 이벤트 제거
myEvnet.emit('event4')

const listener = () => {
   console.log('이벤트5')
}
myEvnet.emit('event5', listener)
myEvnet.removeListener('event5', listener)
myEvnet.emit('event5')

// 이벤트 리스너의 갯수 출력
console.log(myEvnet.listenerCount('evnet2'))
