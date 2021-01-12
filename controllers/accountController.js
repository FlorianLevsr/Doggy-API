require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Account } = require('../models');

module.exports = {

    login: async (request, response) => {

        try {

            if (!request.body.username || !request.body.password) {

                return response.status(400).json({message: 'Username or password field cannot be blank.'});

            };

            const checkAccount = await Account.findOne({ where: { username: request.body.username } });

            if (!checkAccount) {

                return response.status(400).json({message: 'Utilisateur inconnu!'})

            };

            const comparison = await bcrypt.compareSync(request.body.password, checkAccount.password);

            if (!comparison) {

                return response.status(400).json({message: 'Mot de passe incorrect!'})

            };

            const accessToken = jwt.sign({ username: request.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

            // accessToken is in this case directly returned in json format for teaching purposes
            // copy it and use it as authorization headers, format: Bearer <token>. Otherwise, you won't be able to use routes which need an authentification 
            // (in other words, all the ones related to crud requests)

            response.cookie('jwt', accessToken).json({message: 'Connecté!', token: accessToken});


        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    logout: (_, response) => {

        response.cookie('jwt', {maxAge: 0}).status(200).json({message: "ok"});

    }

};