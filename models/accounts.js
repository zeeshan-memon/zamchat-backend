const mongoose = require("mongoose");

 const users= new mongoose.Schema({
    name:{
        type: String
    }
})
var User = mongoose.model('user', users);
module.exports = User