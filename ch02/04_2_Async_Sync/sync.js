// 동기 방식으로 파일 읽기

const fs = require('fs')

console.time('실행 시간 측정')

console.log('시작') //동기

let data = fs.readFileSync('./readme2.txt')
console.log('1번', data.toString())

data = fs.readFileSync('./readme2.txt')
console.log('2번', data.toString())

data = fs.readFileSync('./readme2.txt')
console.log('3번', data.toString())

console.log('끝')

console.timeEnd('실행 시간 측정')
