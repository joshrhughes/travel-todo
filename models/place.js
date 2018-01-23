var mongoose = require('mongoose');

var Place = mongoose.Schema({ 
    userEmail: String,
    latLong: String,  // latitude and longitude
    locName: String, // location name
    description: String, // user will be able to add description of location
    complete: Boolean, //if the todo is completed or not
    priority: Number, 
    rating: Number,
    number: Number
});

module.exports = mongoose.model('Place', Place);