var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/tunely");

var User = require('./user');
var Place = require('./place');

module.exports.User = User;
module.exports.Place = Place;
//we are going to add all our modles here 