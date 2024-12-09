const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.route('/').get(async (req, res, next) => {
   try {
      const users = await User.findAll()
      res.status(200).json(users)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
