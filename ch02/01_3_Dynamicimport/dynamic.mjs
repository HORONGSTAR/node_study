const a = true

/*
ES모듈에서는 사용할수 x
if (a) {
   import './func.mjs'
}

*/

if (a) {
   await import('./func.mjs')
}

console.log('성공')
