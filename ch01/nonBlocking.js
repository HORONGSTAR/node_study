// 논 블로킹 방식으로 작성한 코드
// 이전 작업이 완료될때까지 대기하지 x 다음 작업 수행

function longTunningTask() {
   // 오래 걸리는 작업...
   console.log('작업 끝')
}

console.log('시작')
//오래걸리는 작업에 논블로킹 처리를 해주는 것이 좋다.
setTimeout(longTunningTask, 0)
console.log('다음 작업')
