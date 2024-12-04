require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.send('welcome to the home!')
})

app.use((req, res, next) => {
   console.log(req.path)
   //startWith(문자열) : 해당 문자열로 시작하는지 true, false값을 리턴
   if (req.path.startsWith('/api')) {
      // '/api'로 시작하는 경로라면 morgan 실행
      morgan('dev')(req, res, next)
   } else {
      next()
   }
})

app.get('/api/user', (req, res) => {
   res.json([
      { id: 1, name: 'John' },
      { id: 1, name: 'Jane' },
   ])
})

app.get('/api/product', (req, res) => {
   res.json([
      { id: 3, name: 'Labtop' },
      { id: 4, name: 'phone' },
   ])
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
