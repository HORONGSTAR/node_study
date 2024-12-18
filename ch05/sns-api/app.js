const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
require('dotenv').config()
const cors = require('cors')
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const passport = require('passport') //인증 미들웨어
const passportConfig = require('./passport')
//cors 미들웨어 -> 출처가 불분명한 repuest를 막기위한 cors정책에서 특정 주소를 허용하기 위한 미들웨어

const app = express()
passportConfig() // passportConfig실행
app.set('port', process.env.PORT || 8002)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
   session({
      resave: false, //세션데이터 변경시 재저장 여부
      saveUninitialized: true, //초기화 되지 않은 세션 저장 여부
      secret: process.env.COOKIE_SECRET, //세션 암호화 키
      cookie: {
         httpOnly: true, //https를 사용할때만 쿠키 전송 여부
         secure: false, //secure ? https만 사용 : https, http둘다 사용
      },
   })
)

// 패스포트 초기화 및 연결
app.use(passport.initialize()) //초기화
app.use(passport.session()) // 생성한 쿠키 연결

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않습니다.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'
   res.status(statusCode).json({
      succes: false,
      message: errorMessage,
      error: err,
   })
})

app.options('*', cors()) //origin에서 이어지는 모든 경로에 대한 options 요청을 허용
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
