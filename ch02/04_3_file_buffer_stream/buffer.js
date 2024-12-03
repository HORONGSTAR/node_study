// Buffer 객체를 생성하고 다양한 함수 사용

const buffer = Buffer.from('저를 버퍼로 바꿔보세요.')

console.log('from():', buffer) //buffer객체 출력
console.log('length:', buffer.length)
console.log('toString():', buffer.toString()) //buffer를 문자열로 변환

//Buffer 객체 여러개를 배열로 다루기
const array = [Buffer.from('뛰엄 '), Buffer.from('뛰엄 '), Buffer.from('뛰어쓰기 ')]

//concat()을 사용해 Burrer 여러개를 하나의 Buffer로 통합
const buffer2 = Buffer.concat(array)
console.log('concat():', buffer2.toString())

//빈 Buffer 생성
const buffer3 = Buffer.alloc(5) //크기가 5인 버퍼
console.log('alloc():', buffer3)
