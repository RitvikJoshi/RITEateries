
module.exports.getAllPlaces= function(req,res){
    var response ={
        status : 200,
        message : {}
    };
    if(req){
        console.log("Incoming request "+req.url);
        response.status =200;
        response.message = { message : "Connection seems to be working properly"};
    }

    res
        .status(response.status)
        .json(response.message);

};

module.exports.getOnePlace = function(req,res){
  var response ={
     status : 200,
     message : {}
  } ;
  var placeId = req.params.placeId;
  if(req){
      console.log("Incoming request "+req.url);
      response.status=200;
      response.message = {message : "Single place connection seems to be working .."+placeId};
  }

  res
      .status(response.status)
      .json(response.message);

};
