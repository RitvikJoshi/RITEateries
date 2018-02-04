
//Setup Db connection

require('./api/data/dbConnection');

//Import packages
var express= require("express");
var path = require("path");
var app = express();
var bodyParser =require('body-parser');
var routes = require('./api/routes');

//Set port for listening
app.set('port',3000);

//Initiate server port
var server = app.listen(app.get('port'),function(){
    console.log("Server created...listening on port "+server.address().port);
});


/*
Middleware creation
- app.use is used to create a middleware to catch the request before passing it to backend server
*/

//Printing the incoming req in the console
app.use(function(req, res, next){
    if(req){
        console.log(req.method +" "+ req.url);
    }
    next();
});

//Using body-parser to obtain the query parameter from the url
app.use(bodyParser.urlencoded({extended:false}));

//Loading static home page
app.use(express.static(path.join(__dirname,'public')));

//Loading angular lib from node_modules
app.use('/node_modules',express.static(__dirname+'/node_modules'));

//Use available routes
app.use("/",routes);






