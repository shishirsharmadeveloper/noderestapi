const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        username:String,
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            require:true
        }
});

module.exports = mongoose.model('user',userSchema);

