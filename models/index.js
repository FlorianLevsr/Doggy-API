const Dog = require('./dog')
const Gender = require('./gender')
const Breed = require('./breed')
const FavoriteFood = require('./favoriteFood')
const Owner = require('./owner')
const Account = require('./account');

Dog.belongsTo(Owner, {

    foreignKey: "owner_id",
    as: "owner"

});

Dog.belongsTo( Gender, {

    foreignKey: "gender_id",
    as: "gender"

})


Dog.belongsTo( Breed, {

    foreignKey: "breed_id",
    as: "breed"

})

FavoriteFood.belongsToMany( Dog, {

    as: "dogs",
    through: "m2m_dog_favorite_food",
    otherKey: 'dog_id',
    foreignKey: 'favorite_food_id',
})

Dog.belongsToMany( FavoriteFood, {

    as: "favorite_foods",
    through: "m2m_dog_favorite_food",
    otherKey: 'favorite_food_id',
    foreignKey: 'dog_id',
})

module.exports = { Dog, Owner, Gender, Breed, FavoriteFood, Account }