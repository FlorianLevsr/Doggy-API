const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class Owner extends Sequelize.Model {};

Owner.init({
  name: Sequelize.STRING
},{
  sequelize,
  schema: 'doggyAPI',
  tableName: "owner"
});

module.exports = Owner;