var mongoose = require('mongoose');
var places = mongoose.model('Eateries');

module.exports.getAllPlaces= function(req,res){
    console.log("In getAllPlaces");
    places
        .find()
        .exec(function(err,data) {
            console.log(data);
            var response ={
                status : 200,
                message : {}
            };

            if (err) {
                console.log('Error occurred' + err);
                response.status = 500;
                response.message = {'Error': 'Error occurred getAllPlaces'};
            }
             else if (!data) {
                console.log('No data found');
                response.status = 404;
                response.message = {'Not found': 'Data not found'};
            }
            else {
                console.log(data);
                response.status = 200;
                response.message = data;
            }

            res
                .status(response.status)
                .json(response.message);

        });


};

module.exports.getOnePlace = function(req,res){


    var placeId = req.params.placeId;
    console.log("Json request");

    places
        .findById(placeId).exec(function(err,doc){
        console.log("Records found ");
        var response = {
            "status" : 200,
            "message" : doc
        };

        if(err){
            response.status=500;
            response.message={"Bad Request": "Error occurred while fetching hotels "};
        }else if(!doc) {
            response.status=404;
            response.message={"Not Found": "No records found for "+placeId};
        }

        res
            .status(response.status)
            .json(response.message);
        });

};

var splitArray = function(dataString){
    var dataList =[];
    if(dataString && len(dataString)>0) {
        dataList = dataString.split(';');
    }
    return dataList;
};


module.exports.addPlace = function(req,res){

    places
        .create({
            name : req.body.name,
            stars : parseInt(req.body.stars,10),
            location : {
                address : req.body.address,
                coordinates :[
                    parseFloat(req.body.longitude),
                    parseFloat(req.body.latitude)
                ]
            },
            contact : {
                manager : req.body.manager,
                email : req.body.email,
                phone : req.body.phone
            },
            payment : splitArray(req.body.payment),
            speciality : splitArray(req.body.speciality),
            photos : splitArray(req.body.photos),

        },function(err, hotel ){
            console.log("Creating place");
            if(err){
                res
                    .status(500)
                    .json({"Error":"Error occurred while inserting new record"});

            }
            if(hotel){
                console.log("Place successfully created");
                res
                    .status(201)
                    .json(hotel);
            }
        });


};


module.exports.updatePlace = function(req,res){

    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("-reviews -menu")
        .exec(function(err,place){

            console.log("updating place "+placeId );
            if(err){
                console.log("Error occurred while fetching place "+ placeId);
                res
                    .status(500)
                    .json({ "Error" : "Error occurred while fetching place "+ placeId });
            }
            if(place){
                console.log("Data fetched successfully");
                place.name = req.body.name;
                place.description = req.body.description;
                place.location = {
                    address : req.body.address,
                    coordinates : [
                        parseFloat(req.body.longitude),
                        parseFloat(req.body.latitude)
                    ]
                };
                place.stars = req.body.stars;
                place.payment = splitArray(req.body.payment);
                place.speciality = splitArray(req.body.speciality);
                place.photos = splitArray(req.body.photos);
                place.manager = req.body.manager;
                place.email = req.body.email;
                place.phone = req.body.phone;


                places.save(function(err,updated){
                   if(err){
                       console.log("Error occurred while updating place "+ placeId);
                       res
                           .status(500)
                           .json({ "Error" : "Error occurred while updating place "+ placeId });
                   }
                   if(updated){
                       console.log("Successfully updated place "+ placeId);
                       res
                           .status(204)
                           .json();

                   }

                });
            }


        });

};


module.exports.deleteOne=function(req,res){

    var placeId = req.params.placeId;

    places
        .findByIdAndRemove(placeId)
        .exec(function(err,place){
           if(err){
               console.log("Error occurred during deletion");
               res
                   .status(500)
                   .json({"Error":"Error occurred while deleting record"});
           }
           if(place){
               console.log("Record successfully deleted");
               res
                   .status(204)
                   .json();
           }

        });


};