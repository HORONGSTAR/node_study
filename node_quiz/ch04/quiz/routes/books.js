const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const books = await Book.findAll()
         res.status(200).json(books)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         console.log('req.body', req.body)
         const books = await Book.create({
            title: req.body.title,
            genre: req.body.genre,
            Authorld: req.body.id,
         })
         console.log(books)
         res.status(201).json(books)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

router
   .route('/:id')
   .patch(async (req, res, next) => {
      try {
         const result = await Book.update(
            {
               title: req.body.title,
               genre: req.body.genre,
               Authorld: req.body.id,
            },
            { where: { id: req.params.id } }
         )
         if (result[0] === 0) {
            return res.status(404).json({ message: '도서 정보를 찾을 수 없습니다.' })
         }
         res.json({ message: '도서 정보가 수정되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Book.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            return res.status(404).json({ message: '도서 정보를 찾을 수 없습니다.' })
         }
         res.json({ message: '도서 정보가 삭제되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })

module.exports = router
