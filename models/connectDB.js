var mongoose = require("mongoose");

var uri = 'mongodb://localhost:27017/blogdata';
mongoose.connect(uri);

exports.mongoose = mongoose;