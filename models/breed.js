const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class Breed extends Sequelize.Model {};

Breed.init({
  name: Sequelize.STRING
},{
  sequelize,
  schema: 'doggyAPI',
  tableName: "breed"
});

module.exports = Breed;