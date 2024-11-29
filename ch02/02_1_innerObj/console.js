const string = 'abc'
const number = 1
const boolean = true
const obj = {
   outside: {
      inside: {
         key: 'value',
      },
   },
}

console.table([
   { name: '제로', birth: 1994 },
   { name: '제로', birth: 1994 },
])

console.dir(obj, { color: false, depth: 2 })
console.dir(obj, { color: true, depth: 1 })

//time()과 timeEnd()안의 문자열이 같아야한다
console.time('실행시간 측정')
for (let i = 0; i < 100000; i++) {}
console.timeEnd('실행시간 측정')

function b() {
   console.trace('에러 위치 추적') //에러가 어디서 발생했는지 추적하게 해줌.
   //에러 발생시 위치를 알려주지 않을경우 사용하기 좋음
}

function a() {
   b()
}

a()
