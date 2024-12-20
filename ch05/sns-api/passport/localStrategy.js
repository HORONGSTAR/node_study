const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

//로그인 시 사용자 정보를 DB로 조회하고 사용자 존재 여부와 비밀번호를 비교
module.exports = () => {
   passport.use(
      new localStrategy(
         {
            //input 태그에서 name으로 사용하는 이름을 지정
            usernameField: 'email', //req.body.email
            passwordField: 'password', //req.body.password
         },
         //실제 인증 로직
         async (email, password, done) => {
            //이메일로 사용자 조회
            try {
               const exUser = await User.findOne({ where: { email } })
               if (exUser) {
                  const result = await bcrypt.compare(password, exUser.password)
                  if (result) {
                     done(null, exUser)
                  } else {
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                  }
               } else {
                  done(null, false, { message: '가입되지 않은 회원입니다.' })
               }
            } catch (err) {
               console.error(err)
               done(err)
            }
         }
      )
   )
}
