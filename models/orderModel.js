const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const User = require('./userModel');
const Company = require('./companyModel');
const Design = require('./designModel');

const Order = db.seq.define(
    'order',
    {
      // userId: {
      //   type: Sequelize.INTEGER
      // },
      comId: {
        type: Sequelize.INTEGER
      },
      designId: {
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      orderPrice: {
        type: Sequelize.STRING
      },
      orderStatus: {
        type: Sequelize.STRING,
        defaultValue: "Acceptance pending"
      },
      isOrderAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isInvoiceGenerated: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      acceptedDate: {
        type: Sequelize.STRING
      },
      deliverOn: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      }
    },
    {
      timestamps: true
    }
  );

  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Design);
  Design.belongsTo(User);

  // Order.hasOne(Company);
  // Company.belongsTo(Order);

  // Order.hasOne(Design);
  // Design.belongsTo(Order);
  
  
  Order.sync({ force: false});
  module.exports = Order;