const express = require('express')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { sequelize } = require('./models')
const Router = require('./routes')
const customersRouter = require('./routes/customers')
const ordersRouter = require('./routes/orders')

dotenv.config()

const app = express()
app.set('port', process.env.PORT || 5000)

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('DB CONNECT SUCCESE!')
   })
   .catch((err) => {
      console.log('DB CONNECT FAIL : ', err)
   })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', Router)
app.use('/customers', customersRouter)
app.use('/orders', ordersRouter)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} Cannot find router.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || 'SERVER ERROR'

   res.status(status).send(`
      <h1>Error ${status}</h1>
      <p>${message}</p>
      ${process.env.NODE_ENV !== 'production' ? `<pre>${err.stack}</pre>` : ''}
   `)
})

app.listen(app.get('port'), () => {
   console.log(app.get('port'), 'START!')
})
