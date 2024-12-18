const express = require('express')
const morgan = require('morgan')
const listRouter = require('./routes/list')
const viewRouter = require('./routes/view')

const app = express()
app.use(morgan('dev'))

app.use('/list', listRouter)
app.use('/veiw', viewRouter)

app.use((req, res, next) => {
   res.status(404).send('Not Found')
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))