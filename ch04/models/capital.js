const Sequelize = require('sequelize')
module.exports = class Capital extends Sequelize.Model {
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
            modelName: 'Capital',
            tableName: 'capitals',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Capital.belongsTo(db.Country, {
         foreignKey: 'CountryId', //Capital에서 외래키로 사용할 컬럼명
         targetKey: 'id', //Capital이 Country에서 참조할 컬럼 이름
      })
   }
}
