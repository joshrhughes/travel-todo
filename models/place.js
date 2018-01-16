var mongoose = require('mongoose');

var Place = mongoose.Schema({
    //local: {
        userEmail: String,
        latLong: String,  // latitude and longitude
        locName: String, // location name
        description: String,
        complete: Boolean, //if the todo is completed or not
        priority: Number, 
        rating: Number
   // }
});


module.exports = mongoose.model('Place', Place);