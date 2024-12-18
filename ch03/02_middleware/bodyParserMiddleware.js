const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 4. body Parser 미들웨어
// request 데이터를 json 객체로 받아올 수 있게 해줌
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// url-encoded 요청처리

app.get('/', (req, res) => {
   //submit.html 페이지 response
   res.sendFile(path.join(__dirname, '/submit.html'))
})

app.post('/submit', (req, res) => {
   // request, response 할때는 header + body 형태로 데이터가 전송된다.
   // header 영역: request, response 정보가 들어있음
   // body : 데이터가 들어있음
   console.log(req.body)
   res.send(`데이터 수신 완료! ${req.body.name} ${req.body.age}`)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중입니다. http://localhost:${app.get('port')}`)
})
