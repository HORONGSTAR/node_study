const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Customer = require('../models/customer')

router.route('/')

router.get('/customers/:id/orders', async (req, res, next) => {
   try {
      const results = await Order.findAll({
         include: {
            model: Customer,
            where: { id: req.params.id },
         },
      })
      console.log(results)
      res.status(200).json(results)
   } catch (err) {
      console.error(err)
      next(err)
   }
})
module.exports = router
