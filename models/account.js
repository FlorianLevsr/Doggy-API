const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class Account extends Sequelize.Model {};

Account.init({
  username: Sequelize.STRING,
  password: Sequelize.STRING
},{
  sequelize,
  schema: 'doggyAPI',
  tableName: "account"
});

module.exports = Account;