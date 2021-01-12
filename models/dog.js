const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class Dog extends Sequelize.Model {};

Dog.init({

  name: Sequelize.STRING,
  gender_id: Sequelize.INTEGER,
  breed_id: Sequelize.INTEGER,
  owner_id: Sequelize.INTEGER

},{

  sequelize,
  schema: 'doggyAPI',
  tableName: "dog",
  
});

module.exports = Dog;