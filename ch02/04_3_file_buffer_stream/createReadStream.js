const fs = require('fs')
// 파일을 읽기 위한 스트림 생성
// highWaterMark: 한번에 읽어드릴 버퍼 크기를 16byte로 설정
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 })

// 읽어드린 데이터를 저장할 배열
const data = []
readStream.on('data', (chunk) => {
   data.push(chunk) // 들어온 데이터를 배열에 추가
   console.log('data:', chunk, chunk.length, chunk.toString())
})

// end 이벤트
readStream.on('end', () => {
   console.log('end:', Buffer.concat(data).toString())
})

// error 이벤트 : 스트림에서 에러가 발생했을때 발생
readStream.on('error', (err) => {
   console.log('error:', err)
})
