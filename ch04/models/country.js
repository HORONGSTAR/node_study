const Sequelize = require('sequelize')
module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100),
               allowNull: false, //not null
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Country',
            tableName: 'countrys',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Country.hasOne(db.Capital, {
         foreignKey: 'CountryId', //Capital에서 외래키로 사용할 컬럼명
         sourceKey: 'id', //Country에서 Capital에게 외래키로 제공할 컬럼이름
      })
   }
}
