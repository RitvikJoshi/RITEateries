var mongoose = require('mongoose');


 var menuItem= new mongoose.Schema({
    category : String,
    items : [String]
});

var review= new mongoose.Schema({
    name : String,
    comments : String,
    createdOn : {
        type : Date,
        "default" : Date.now
    }
});

var days=new mongoose.Schema({
    day : String,
    openTime : Number,
    closeTime: Number
});


var eateriesSchema = new mongoose.Schema({

    name : {
        type :String,
        required: true
    },
    description : String,
    menu : [menuItem],
    daysOpen : [days],
    location : {
        address : String,
        coordinates : {
            type: [Number],
            index: '2dsphere'
        }
    },
    reviews : [review],
    stars : {
        type :	Number,
        min : 0,
        max : 5,
        defualt : 0
    },
    payment : [String],
    speciality : [String],
    photos : [String],
    contact : {
        manager : String,
        email : String,
        phone : Number
    }

});


mongoose.model('Eateries',eateriesSchema);
