const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const customer = await Customer.findAll()
         console.log(customer)
         res.status(200).json(customer)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         const customer = await Customer.create({
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
         })

         console.log(customer)
         res.status(201).json(customer)
      } catch (err) {
         if (err.name == 'SequelizeUniqueConstraintError') {
            return res.status(404).json({
               message: `중복된 ${err.errors[0].path} 정보를 입력하셨습니다.`,
            })
         }
         console.error(err)
         next(err)
      }
   })

router
   .route('/:id')
   .patch(async (req, res, next) => {
      try {
         const result = await Customer.update(
            {
               fullName: req.body.fullName,
               email: req.body.email,
               phoneNumber: req.body.phoneNumber,
            },
            {
               where: { id: req.params.id },
            }
         )
         if (result[0] === 0) {
            const check = await Customer.findOne({
               where: { id: req.params.id },
            })
            if (!check) {
               return res.status(404).json({ message: '고객정보를 찾을 수 없습니다.' })
            }
         }
         console.log(result)
         res.status(200).json({ message: '고객정보가 수정되었습니다.' })
      } catch (err) {
         if (err.name == 'SequelizeUniqueConstraintError') {
            return res.status(404).json({
               message: `중복된 ${err.errors[0].path} 정보를 입력하셨습니다.`,
            })
         }
         console.error(err)
         next(err)
      }
   })
   .delete(async (req, res, next) => {
      try {
         const result = await Customer.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            return res.status(404).json({ message: '고객정보를 찾을 수 없습니다.' })
         }
         console.log(result)
         res.status(200).json({ message: '고객정보가 삭제되었습니다.' })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
