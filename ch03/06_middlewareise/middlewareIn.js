require('dotenv').config()
const express = require('express')

const app = express()
app.set('port', process.env.PORT || 3000)

const logMiddleware = (req, res, next) => {
   console.log(`${new Date().toDateString()} ${req.method} ${req.url}`)
   next()
}

// 인증 미들웨어
const autnMiddleware = (req, res, next) => {
   const token = '12345'
   if (token === '12345') {
      console.log('인증성공!')
      next //인증 성공시 다음 미들웨어로 이동
   }
}

app.use((req, res, next) => {
   console.log(req.path)
   // '/secure' 경로에만 인증 미들웨어 실행
   if (req.path === '/secure') {
      autnMiddleware(req, res, next)
   }
})

app.use(logMiddleware)

app.get('/', (req, res) => {
   res.send('환영합니다!')
})

app.get('/secure', (req, res) => {
   res.send('당신은 secure route에 접근했습니다!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
