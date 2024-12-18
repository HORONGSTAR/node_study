//로그인 상태 확인 미들웨어

exports.isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      //로그인 되었으면 다음 미들웨어로 이동
      next()
   } else {
      res.status(403).json({
         seccess: false,
         message: '로그인이 필요합니다.',
      })
   }
}

//비로그인 상태 확인 미들웨어
exports.isNotLoggendIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      //로그인 되지 않았을 경우 다음 미들웨어로 이동
      next()
   } else {
      // 로그인 된 경우
      res.status(400).json({
         seccess: false,
         message: '이미 로그인이 된 상태입니다.',
      })
   }
}
