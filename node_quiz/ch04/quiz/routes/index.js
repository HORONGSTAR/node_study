const express = require('express')
const Author = require('../models/author')
const router = express.Router()

router.get('/:id/books', async (req, res, next) => {
   try {
      const author = await Author.findAll()
      res.status(200).json(author)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
