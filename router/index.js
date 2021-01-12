const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const dogController = require('../controllers/dogController');
const accountController = require('../controllers/accountController');

const authenticateToken = require('../mw/authenticateToken');

const notFound = require('../mw/notFound');

router.get('/', mainController.homepage);

router.post('/login', accountController.login);
router.get('/logout', authenticateToken.authenticateToken, accountController.logout);

router.get('/dogs', dogController.findAllDogs);
router.get('/dog/:id(\\d+)', dogController.findDogById);
router.get('/dogs/male', dogController.findMaleDogs);
router.post('/dogs/breed', dogController.findDogsByBreed);

router.post('/dog/create', authenticateToken.authenticateToken, dogController.createDog);
router.put('/dog/:id(\\d+)/edit', authenticateToken.authenticateToken, dogController.updateSelectedDog);
router.delete('/dog/:id(\\d+)/delete', authenticateToken.authenticateToken, dogController.deleteDog);

router.use(notFound.error);


module.exports = router;

