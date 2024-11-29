// 조건: "Execution Time"이라는 이름으로 실행 시간을 측정하세요.
function calculate() {
   let sum = 0
   for (let i = 0; i < 1e6; i++) {
      sum += i
   }
   return sum
}

console.time('Execution Time')
calculate()
console.timeEnd('Execution Time')
