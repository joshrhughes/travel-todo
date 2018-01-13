var mongoose = require('mongoose');

var Location = mongoose.Schema({
    local: {
        latLong: String,
        password: String,
        nameFirst: String,
    }
});



module.exports = mongoose.model('Location', Location);