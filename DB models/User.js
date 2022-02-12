const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    img : {
        type : String
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;