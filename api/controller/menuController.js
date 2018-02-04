var mongoose = require('mongoose');
var places = mongoose.model('Eateries');



var splitArray=function(string) {
    var output = [];

    if (string && string.length > 0) {
        output = string.split(";");
    }

    return output;

};


var addMenu = function(place,req,res){

    place.menu.push({
       category : req.body.category,
       items : splitArray(req.body.items)
    });

    place.save(function(err,updated){
       if(err){
           console.log("Error occurred while posting new menu item");
           res
               .status(500)
               .json({"Error":"Error occurred while posting new menu item"});
       }
       if(updated){
           console.log("Menu updated");
           res
               .status(200)
               .json(updated);
       }
    });


};



module.exports.pushMenu = function(req,res){

    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("menu")
        .exec(function(err,place){

            if(err){
                console.log("Error occurred while fetching menu for place "+placeId);
                res
                    .status(500)
                    .json({"Error":"Error occurred while fetching data"});
            }
            if(place){
                addMenu(place,req,res);
            }

        });

};


module.exports.getMenu = function(req,res){

    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("menu")
        .exec(function(err,place){

            if(err){
                console.log("Error occurred while fetching menu for place "+placeId);
                res
                    .status(500)
                    .json({"Error":"Error occurred while fetching data"});
            }
            if(place.menu){

                console.log("Sending menu data");
                res
                    .status(200)
                    .json(place.menu);
            }else{
                res
                    .status(200)
                    .json([]);
            }

        });

};



module.exports.updateMenu = function(req,res){


    var placeId = req.params.placeId;
    var menuId = req.params.menuId;
    places
        .findById(placeId)
        .select("menu")
        .exec(function(err,place){

            if(err){
                console.log("Error occurred while fetching menu for place "+placeId);
                res
                    .status(500)
                    .json({"Error":"Error occurred while fetching data"});
            }
            if(place){
                var menuItem = place.menu.id(menuId);
                menuItem.category = req.body.category;
                menuItem.items = splitArray(req.body.items);

                place.save(function(err,updated){
                   if(err){
                       console.log("Error occurred while updating menu "+menuId);
                       res
                           .status(500)
                           .json({"Error":"Error occurred while updating menu "+menuId});
                   }

                   if(updated){
                       console.log("Menu updated");
                       res
                           .status(204)
                           .json();
                   }

                });

            }
        });

};


module.exports.deleteMenu = function(req,res){


    var placeId = req.params.placeId;

    places
        .findById(placeId)
        .select("menu")
        .exec(function(err,place){

            if(err){
                console.log("Error occurred while fetching menu for place "+placeId);
                res
                    .status(500)
                    .json({"Error":"Error occurred while fetching data"});
            }
            if(place){
                place.menu=[];

                place.save(function(err,updated){
                    if(err){
                        console.log("Error occurred while deleting menu "+menuId);
                        res
                            .status(500)
                            .json({"Error":"Error occurred while deleting menu "+menuId});
                    }

                    if(updated){
                        console.log("Menu deleted");
                        res
                            .status(204)
                            .json();
                    }

                });

            }
        });

};
