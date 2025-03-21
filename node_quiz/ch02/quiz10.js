// 조건:
// 1. URL의 쿼리 문자열에서 `query` 값과 `page` 값을 추출하세요.
// 2. Node.js의 `URLSearchParams`를 사용하세요.

const { URL } = require('url')
const queryString = '?query=JavaScript&page=2'

// 여기에 코드를 작성하세요.
const myURL = new URL('http://www.example.com/path' + queryString)

console.log('Query:', myURL.searchParams.get('query'))
console.log('Page:', myURL.searchParams.get('page'))
