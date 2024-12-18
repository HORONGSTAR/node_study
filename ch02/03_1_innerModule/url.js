const url = require('url')

const { URL } = url
const myURL = new URL('http://www.naver.com')

console.log(myURL) //주소를 객체로 분해
console.log(url.format(myURL))
