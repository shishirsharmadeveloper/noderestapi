const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
        title:String,
        description:String,
        photo:String
        
});

module.exports = mongoose.model('blog', blogSchema);

