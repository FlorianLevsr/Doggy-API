const { Dog } = require('../models');

module.exports = {

    findAllDogs: async (_, response) => {

        try {

            const allDogs = await Dog.findAll({

                // detailed data (such as ids, relation tables, etc) is deliberatly excluded for teaching purposes. 
                // Results from other methods are fully returned.

                attributes: [ 'name' ],
                include: [

                    { association: 'breed', attributes: [ 'name' ]},
                    { association: 'gender', attributes: [ 'name' ]},
                    { association: 'owner', attributes: [ 'name' ]},
                    { association: 'favorite_foods', attributes: [ 'name' ], through: { attributes: []} },

                ],
                
            });

            if (!allDogs) {

                return response.status(200).json({message: 'Aucun chien n\'est enregistré!'});

            };

            response.status(200).json({ data: allDogs });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    findDogById: async (request, response) => {

        try {

            const selectedDog = await Dog.findByPk(request.params.id, {

                include: [

                    'breed',
                    'gender',
                    'owner',
                    'favorite_foods'

                ]

            });

            if (!selectedDog) {

                return response.status(400).json({message: 'Ce chien n\'existe pas!'});

            };

            response.status(200).json({ data: selectedDog });


        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    findMaleDogs: async (_, response) => {

        try {

            const allMaleDogs = await Dog.findAll({

                include: [

                    { association: 'gender', where: { 'name': 'Male' } },
                    'breed',
                    'owner',
                    'favorite_foods'

                ],

            });

            if (!allMaleDogs) {

                return response.status(200).json({message: 'Aucun chien mâle n\'a été trouvé!'});

            };

            response.status(200).json({ data: allMaleDogs });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    findDogsByBreed: async (request, response) => {

        try {

            const allDogsByBreed = await Dog.findAll({

                include: [

                    'gender',
                    { association: 'breed', where: { 'name': request.body.breed } },
                    'owner',
                    'favorite_foods'

                ]

            });

            response.status(200).json({ data: allDogsByBreed });

            if (!allDogsByBreed) {

                return response.status(200).json({message: 'Aucun chien de cette race n\'a été trouvé!'});

            };

        } catch (error) {

            response.status(500).json(error.toString());

        }

    },

    createDog: async (request, response) => {

        try {

            const dog = {

                name: request.body.name,
                gender_id: request.body.gender_id,
                breed_id: request.body.breed_id,
                owner_id: request.body.owner_id,

            };

            for (const field in dog) {

                if (!dog[field]) {

                    return response.status(400).json({message: `Vous devez remplir le champ ${field}`});

                };

            };

            const createdDog = await Dog.create(dog);

            response.status(200).json({ message: 'Chien ajouté à la base de donnée!', data: createdDog });
            

        } catch (error) {

            response.status(500).json(error.toString());

        }

    },

    updateSelectedDog: async (request, response) => {

        try {

            const dog = {

                name: request.body.name,
                gender_id: request.body.gender_id,
                breed_id: request.body.breed_id,
                owner_id: request.body.owner_id,

            };

            let fieldsToUpdate = {};

            for (const field in dog) {

                if (dog[field]) {

                    fieldsToUpdate[field] = dog[field];

                };

            };

            if(Object.entries(fieldsToUpdate).length === 0) {

                return response.status(400).json({ message: 'Les champs sont tous vides!'});

            };

            const updatedDog = await Dog.update(fieldsToUpdate, { where: { id: request.params.id }, returning: true, plain: true });

            console.log(updatedDog);

            response.status(200).json({ message: 'Chien modifié', data: updatedDog[1].dataValues });


        } catch (error) {

            response.status(500).json(error.toString());

        }

    },

    deleteDog: async (request, response) => {

        try {

            const selectedDog = await Dog.destroy({ where: { id: request.params.id } });

            console.log(selectedDog);

            if(selectedDog === 0) {

                return response.status(400).json({ message: 'Ce chien n\'existe pas!'});

            };

            response.status(200).json({ message: 'Chien supprimé!' });
            

        } catch (error) {

            response.status(500).json(error.toString());

        };

    }


};