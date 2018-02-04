//Import necessary libraries
var express= require('express');
var router = express.Router();
var getPlacesToEat = require('../controller/placeToEatController');
var getReview = require('../controller/reviewController');
var getMenu = require('../controller/menuController');
var getDays = require('../controller/daysController');
//Routes to get all places list
router
    .route('/places')
    .get(getPlacesToEat.getAllPlaces);


//Routes to get detailed information about a place, update, delete and post reviews
router
    .route('/places/:placeId')
    .get(getPlacesToEat.getOnePlace)
    .delete(getPlacesToEat.deleteOne)
    .post(getReview.postReview);


router
    .route('/places/:placeId/update')
    .get(getPlacesToEat.getOnePlace)
    .put(getPlacesToEat.updatePlace);
//Route to add new place in the database
router
    .route('/addPlace')
    .post(getPlacesToEat.addPlace);

router
    .route('/places/:placeId/menu')
    .post(getMenu.pushMenu)
    .get(getMenu.getMenu);

router
    .route('/places/:placeId/menu/:menuId')
    .put(getMenu.updateMenu);

router
    .route('/places/:placeId/days')
    .post(getDays.pushDays);




module.exports = router;
