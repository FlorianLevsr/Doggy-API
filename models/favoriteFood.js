const Sequelize = require('sequelize');
const sequelize = require('../database/database');

class FavoriteFood extends Sequelize.Model {};

FavoriteFood.init({
  name: Sequelize.STRING
},{
  sequelize,
  schema: 'doggyAPI',
  tableName: "favorite_food"
});

module.exports = FavoriteFood;