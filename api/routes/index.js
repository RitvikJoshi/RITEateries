//Import necessary libraries
var express= require('express');
var router = express.Router();
var getPlacesToEat = require('../controller/placeToEatController');
//var getReview = require('../controller/reviewController');


router
    .route('/placesToEat')
    .get(getPlacesToEat.getAllPlaces);


router
    .route('/placesToEat/:placeId')
    .get(getPlacesToEat.getOnePlace);

module.exports = router;
