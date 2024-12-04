const express = require('express')
const app = express()

app.use((req, res, next) => {
   if (req.query.role === 'admin') {
      adminMiddleware(req, res, next)
   } else {
      userMiddleware(req, res, next)
   }
   // 첫 번째 미들웨어: 요청에 따라 다른 미들웨어 호출
})

function adminMiddleware(req, res, next) {
   res.send('Welcome, Admin!')
   console.log('Admin middleware executed')
}

function userMiddleware(req, res, next) {
   res.send('Welcome, User!')
   console.log('User middleware executed')
}

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
