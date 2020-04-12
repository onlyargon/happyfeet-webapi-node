const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Design = db.seq.define(
    'design',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: "Men"
      },
      occasion: {
        type: Sequelize.STRING,
        defaultValue: "Casual"
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: "Shoe"
      },
      size: {
        type: Sequelize.STRING,
        defaultValue: "UK 11"
      },
      soleColor: {
        type: Sequelize.STRING,
        defaultValue: "#fff"
      },
      vampColor: {
        type: Sequelize.STRING,
        defaultValue: "#fff"
      },
      quaterColor: {
        type: Sequelize.STRING,
        defaultValue: "#fff"
      },
      attachment: {
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
  
  
  Design.sync({ force: false });
  module.exports = Design;