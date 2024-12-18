const Sequelize = require('sequelize')
const Customer = require('./customer')
const Order = require('./order')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env]
const db = {}
dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.Customer = Customer
db.Order = Order

Customer.init(sequelize)
Order.init(sequelize)

Customer.associate(db)
Order.associate(db)

module.exports = db
