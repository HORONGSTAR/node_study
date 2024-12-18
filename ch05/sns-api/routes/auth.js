const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const { isLoggedIn, isNotLoggendIn } = require('./middlewares')

//회원가입
router.post('/join', isNotLoggendIn, async (req, res, next) => {
   const { email, nick, password } = req.body
   try {
      const exUser = await User.findOne({
         where: { email },
      })
      if (exUser)
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다.',
         })
      const hash = await bcrypt.hash(password, 12)
      //12 : salt(해시 암호화를 진행시 추가되는 임의의 데이터로 10~12정도의 값을 권장)
      const newUser = await User.create({
         email: email,
         nick: nick,
         password: hash,
      })
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
      })
      next(err)
   }
})

//로그인
router.post('/login', isNotLoggendIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         //로그인 인증후 에러 발생시
         return res
            .status(500)
            .json({ success: false, message: '인증 중 오류 발생', error: authError })
      }
      if (!user) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }
      //정상적으로 인증을 마친 후 사용자를 로그인 상태로 변경
      req.logIn(user, (loginError) => {
         if (loginError) {
            return res
               .status(500)
               .json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }

         //로그인 성공시 user객체와 함께 response
         res.json({ success: true, message: '로그인 성공', user: { id: user.id, nick: user.nick } })
      })
   })(req, res, next)
})

//로그아웃
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logOut((err) => {
      if (err) {
         console.log(err)
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }
      //로그아웃 성공시 세션에 저장되어 있던 사용자 id를 삭제해주고 아래와 같은 결과를 response
      //status code를 주지 않으면 기본값은 200(성공)
      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

//로그인 상태 확인
router.get('/status', async (req, res, next) => {
   if (req.isAuthenticated()) {
      //로그인 되었을때
      //req.user는 prassport의 역직렬화 설정에 의해 로그인 되었을때 가져올 수 있다
      res.json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick,
         },
      })
   } else {
      //로그인이 되지 않았을때
      res.json({ isAuthenticated: false })
   }
})

module.exports = router
