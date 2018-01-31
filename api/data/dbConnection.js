var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/RitEateries';

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
    console.log("connected to MongoDB ..."+dburl);
});


mongoose.connection.on('disconnected',function(){
    console.log('Disconnected from '+dburl);
});

mongoose.connection.on('error',function(err){
   console.log('Error occurred '+err);
});
process.on('SIGINT',function() {
    console.log('Terminating mongodb connection event (SIGINT)');
    process.exit(0);
});

process.on('SIGTERM',function(){
    console.log('Terminating mongodb connection event (SIGTERM) ');
    process.exit(0);
});

process.on('SIGUSR2',function () {
    console.log('Terminating mongodb connection event (SIGUSR2) ');
    process.kill(process.pid,'SIGUSR2');
});


require('./dataModel.js');