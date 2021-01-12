const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class Gender extends Sequelize.Model {};

Gender.init({
  name: Sequelize.STRING
},{
  sequelize,
  schema: 'doggyAPI',
  tableName: "gender"
});

module.exports = Gender;