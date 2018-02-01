var mongoose = require('mongoose');
var places = mongoose.model('Eateries');


module.exports.getAllReviews= function(req,res){
  console.log("In get all reviews");
  var placeId = req.params.placeId;

  places
      .findById(placeId)
      .select("reviews")
      .exec(function(err,place){
         if(err){
             console.log("Error occurred while fetching reviews for place "+placeId);
             res
                 .status(500)
                 .json({"Error":"Error occurred while fetching data"});
         }
         if(place.reviews){
             console.log("Reviews Fetched successfully");
             res
                 .status(200)
                 .json(place.reviews);
         }else{
             res
                 .status(200)
                 .json([]);
         }
      });


};

var addPost = function(place,req,res){

    place.reviews.push({
        "name" : req.body.name,
        "comments" : req.body.comments,
        "stars" : req.body.stars
    });

    place.save(function(err,updated){
        if(err){
            console.log("Error occurred while posting review");
            res
                .status(500)
                .json({"Error":"Error occurred while posting review"});
        }
        if(updated){
            console.log("Review successfully added");
            res
                .status(201)
                .json(updated.reviews);
        }
    });



};


module.exports.postReview =function(req,res) {
  console.log("In post a review");

  var placeId = req.params.placeId;

  places
      .findById(placeId)
      .select("reviews")
      .exec(function(err,place){
          if(err){
            console.log("Error occurred while fetching reviews "+placeId);
            res
                .status(500)
                .json({"Error":"Error occurred while fetching reviews "+placeId});

          }
          if(place){
              addPost(place,req,res);

          }

      });

};

