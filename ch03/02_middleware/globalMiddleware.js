const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//1.전역 미들웨어: 애플리케이션의 모든 request에서 동작하는 미들웨어
//미들웨어는 use() 함수 사용
//request - 미들웨어 - response 중간에서 동작

app.use((req, res, next) => {
   //req(request): request에 대한 정보가 들어있는 객체
   //res(response): response에 대한 정보가 들어있는 객체(주로 응답할때 사용)
   console.log(`${req.method} ${req.url}`)
   console.log('미들웨어1 실행')
   //다음 미들웨어로 이동
   next()
})
app.use((req, res, next) => {
   console.log('미들웨어2 실행')
   //다음 미들웨어로 이동(app.get으로 이동)
   next()
})

app.get('/', (req, res) => {
   res.send('홈페이지')
})

app.get('/about', (req, res) => {
   res.send('소개 페이지')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중입니다. http://localhost:${app.get('port')}`)
})
