const Sequelize = require('sequelize')

module.exports = class Order extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            orderNumber: {
               type: Sequelize.STRING(50),
               allowNull: false,
               unique: true,
            },
            totalPrice: {
               type: Sequelize.INTEGER.UNSIGNED,
               allowNull: false,
            },
            status: {
               type: Sequelize.STRING(20),
               defaultValue: 'pending',
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Order',
            tableName: 'orders',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Order.belongsTo(db.Customer, {
         foreignKey: 'CustomerId',
         targetKey: 'id',
      })
   }
}
