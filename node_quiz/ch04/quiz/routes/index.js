const express = require('express')
const Book = require('../models/book')
const router = express.Router()

router.get('/:id/books', async (req, res, next) => {
   try {
      const books = await Book.findAll({
         where: { Authorld: req.params.id },
      })
      res.status(200).json(books)
   } catch (err) {
      console.error(err)
      next(err)
   }
})

module.exports = router
