// Buffer로 읽었을때 메모리를 얼마나 사용하는지 확인
const fs = require('fs')

// 현재 메모리 사용량 확인
console.log('stream:', process.memoryUsage().rss) // rss - 프로세스가 사용 중인 메모리

const readstream = fs.createReadStream('./big.txt') //파일을 동기적으로 읽기
const writestream = fs.createWriteStream('./big3.txt') //읽어드린 파일을 big2.txt에 동기적으로 쓰기

readstream.pipe(writestream)

// 읽기 스트림 완료 후 메모리 사용량 확인
readstream.on('end', () => {
   console.log('stream:', process.memoryUsage().rss) //메모리 사용량이 34MB만 사용
})
