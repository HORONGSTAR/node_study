const express = require('express')
const Order = require('../models/order')
const router = express.Router()

router
   .route('/')
   .get(async (req, res, next) => {
      try {
         const orders = await Order.findAll()
         console.log(orders)
         res.status(200).json(orders)
      } catch (err) {
         console.error(err)
         next(err)
      }
   })
   .post(async (req, res, next) => {
      try {
         const orders = await Order.create({
            orderNumber: req.body.orderNumber,
            totalPrice: req.body.totalPrice,
            status: req.body.status,
            CustomerId: req.body.id,
         })

         console.log(orders)
         res.status(201).json(orders)
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
         const result = await Order.update(
            {
               orderNumber: req.body.orderNumber,
               totalPrice: req.body.totalPrice,
               status: req.body.status,
               CustomerId: req.body.id,
            },
            {
               where: { id: req.params.id },
            }
         )
         if (result[0] === 0) {
            const check = await Order.findOne({
               where: { id: req.params.id },
            })
            if (!check) {
               return res.status(404).json({ message: '주문정보를 찾을 수 없습니다.' })
            }
         }
         console.log(result)
         res.status(200).json({ message: '주문정보가 수정되었습니다.' })
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
         const result = await Order.destroy({
            where: { id: req.params.id },
         })
         if (result === 0) {
            return res.status(404).json({ message: '주문정보를 찾을 수 없습니다.' })
         }
         console.log(result)
         res.status(200).json({ message: '주문정보가 삭제되었습니다.' })
      } catch (err) {
         console.error(err)
         next(err)
      }
   })

module.exports = router
