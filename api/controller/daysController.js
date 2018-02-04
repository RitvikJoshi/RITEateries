var mongoose = require('mongoose');
var places = mongoose.model('Eateries');

module.exports.getDays =function(req, res){

    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("daysOpen")
        .exec(function(err,place){
           if(err){
               console.log("Error occurred while fetching place data "+placeId);
               res
                   .status(500)
                   .json({"Error":"Error occurred while fetching place data "+placeId});

           }
           if(place.daysOpen){
               console.log("Days Fetched successfully");
               res
                   .status(200)
                   .json(place.daysOpen);
           }else{
               res
                   .status(200)
                   .json([]);
           }

        });

};

module.exports.updateDays = function(req,res){

    var placeId = req.params.placeId;
    var dayId = req.params.dayId;

    places
        .findById(placeId)
        .select("daysOpen")
        .exec(function(err,place){
           if(err){
               console.log("Error occurred while fetching data"+ placeid);
               res
                   .status(500)
                   .json({"Error": "Error occurred while fetching data"+ placeid});
           }
           if(place){
               var days = place.daysOpen.id(dayId);

               if(days) {
                   days.day = req.body.day;
                   days.openTime = req.body.openTime;
                   days.closeTime = req.body.closeTime;


                   place.save(function (err, updated) {
                       if (err) {
                           console.log("Error occurred while updating days" + dayId);
                           res
                               .status(500)
                               .json({"Error": "Error occurred while updating days" + dayId});
                       }
                       if (updated) {
                           console.log("Successfully updated");
                           res
                               .status(204)
                               .json();
                       }

                   });
               }else{
                   res
                       .status(404)
                       .json({"NotFound":"Day not found "+ dayId});

               }
           }
        });



};


var addDays = function(place,req,res){

    place.daysOpen.push({
        day : req.body.day,
        openTime : req.body.openTime,
        closeTime : req.body.closeTime
    });

    place.save(function(err,updated){
        if(err){
            console.log("Error occurred while posting new day ");
            res
                .status(500)
                .json({"Error":"Error occurred while posting new day"});
        }
        if(updated){
            console.log("day updated");
            res
                .status(200)
                .json(updated);
        }
    });


};



module.exports.pushDays = function(req,res){

    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("daysOpen")
        .exec(function(err,place){

            if(err){
                console.log("Error occurred while fetching days for place "+placeId);
                res
                    .status(500)
                    .json({"Error":"Error occurred while fetching data"});
            }
            if(place){
                addDays(place,req,res);
            }

        });

};


