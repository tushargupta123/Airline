const express = require('express');

const {FlightMiddleware} = require('../../middlewares/index')

const cityController = require('../../controllers/city-controller');
const flightController = require('../../controllers/flight-controller');
const airportController = require('../../controllers/airport-controller');

const router = express.Router();

router.post('/city',cityController.create);
router.delete('/city/:id', cityController.destory);
router.get('/city/:id', cityController.get);
router.get('/city', cityController.getAll);
router.patch('/city/:id', cityController.update);
router.post('/flights',FlightMiddleware.validateCreateFlight,flightController.create);
router.get('/flights',flightController.getAll);
router.get('/flight/:id',flightController.get);
router.patch('/flight/:id',flightController.update);
router.post('/airports',airportController.create);

module.exports = router;