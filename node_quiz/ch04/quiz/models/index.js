const Sequelize = require('sequelize')
const User = require('./user')
const Profile = require('./profile')
const Author = require('./author')
const Book = require('./book')

const dotenv = require('dotenv')

//.env에서 현재 실행환경(development, test, production중 하나를 가져옴)
const env = process.env.NODE_ENV || 'development'

//가져온 실행환경에 맞는 db를 가져옴
const config = require('../config/config')[env]
const db = {}
dotenv.config()

//sequelize 객체를 사용해서 데이터베이스 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

//db객체를 생성하여 sequelize 객체와 모든 모델들을 지정
db.sequelize = sequelize

db.User = User
db.Profile = Profile
db.Author = Author
db.Book = Book

//모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Profile.init(sequelize)
Author.init(sequelize)
Book.init(sequelize)

//모델간의 관계설정(예-외래키,연관테이블 등)
User.associate(db)
Profile.associate(db)
Author.associate(db)
Book.associate(db)

//db객체를 모듈로 내보냄
module.exports = db
