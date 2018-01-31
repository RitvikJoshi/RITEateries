//Import necessary libraries
var express= require('express');
var router = express.Router();
var getPlacesToEat = require('../controller/placeToEatController');
//var getReview = require('../controller/reviewController');



router
    .route('/places')
    .get(getPlacesToEat.getAllPlaces);


router
    .route('/places/:placeId')
    .get(getPlacesToEat.getOnePlace);


router
    .route('/places/addPlace')
    .post(getPlacesToEat.addPlace);


module.exports = router;
