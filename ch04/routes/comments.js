const express = require('express')
const Comments = require('../models/comment')

const router = express.Router()

//새로운 댓글 등록
router.post('/', async (req, res, next) => {
   try {
      const comment = await Comments.create({
         commenter: req.body.id,
         comment: req.body.comment,
      })
      console.log(comment)
      res.status(201).json(comment)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

//댓글 수정
router
   .route('/:id')
   .patch(async (req, res, next) => {
      try {
         const result = await Comments.update(
            { comment: req.body.comment },
            { where: { id: req.params.id } }
         )
         //result: 수정된 레코드의 갯수를 가지고 있다.
         if (result[0] === 0) {
            //수정된 데이터가 없을경우 patch함수를 끝내면서 json객체 return
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
         }
         res.json({ message: '댓글이 수정되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Comments.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            //수정된 데이터가 없을경우 patch함수를 끝내면서 json객체 return
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
         }
         res.json({ message: '댓글이 삭제되었습니다.', result })
      } catch (error) {
         console.error(error)
         next(error)
      }
   })

module.exports = router
