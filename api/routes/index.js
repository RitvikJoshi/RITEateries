//Import necessary libraries
var express= require('express');
var router = express.Router();
var getPlacesToEat = require('../controller/placeToEatController');
var getReview = require('../controller/reviewController');

//Routes to get all places list
router
    .route('/places')
    .get(getPlacesToEat.getAllPlaces);


//Routes to get detailed information about a place, update, delete and post reviews
router
    .route('/places/:placeId')
    .get(getPlacesToEat.getOnePlace)
    .put(getPlacesToEat.updatePlace)
    .delete(getPlacesToEat.deleteOne)
    .post(getReview.postReview);

//Route to add new place in the database
router
    .route('/addPlace')
    .post(getPlacesToEat.addPlace);

/*
    Routes defined for adding reviews
 */







module.exports = router;
