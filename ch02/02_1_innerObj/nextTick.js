setImmediate(() => {
   console.log('immediate')
})

process.nextTick(() => {
   console.log('nextTick')
})

setTimeout(() => {
   console.log('timeout')
})

Promise.resolve().then(() => console.log('promise'))

//process.nextTick는 setImmediate이나 setTimeout보다 먼저 실행된다.
//Promise 객체도 setImmediate이나 setTimeout보다 먼저 실행된다.
