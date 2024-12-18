const express = require('express')
const Author = require('../models/author')
const router = express.Router()

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const authors = await Author.findAll()
         res.status(200).json(authors)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         console.log('req.body', req.body)
         const author = await Author.create({
            name: req.body.name,
            age: req.body.age,
         })
         console.log(author)
         res.status(201).json(author)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

router
   .route('/:id')
   .patch(async (req, res, next) => {
      try {
         const result = await Author.update(
            {
               name: req.body.name,
               age: req.body.age,
            },
            { where: { id: req.params.id } }
         )
         if (result[0] === 0) {
            return res.status(404).json({ message: '저자 정보를 찾을 수 없습니다.' })
         }
         res.json({ message: '저자 정보가 수정되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Author.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            return res.status(404).json({ message: '저자 정보를 찾을 수 없습니다.' })
         }
         res.json({ message: '저자 정보가 삭제되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })

module.exports = router
