const fs = require('fs').promises

console.log('시작')

fs.readFile('./readme2.txt')
   .then((data) => {
      console.time('실행 시간 측정')
      console.log('1번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('2번', data.toString())
      return fs.readFile('./readme2.txt')
   })
   .then((data) => {
      console.log('3번', data.toString())
      console.log('끝')
      console.timeEnd('실행 시간 측정')
   })
   .catch((err) => {
      console.error(err)
   })
