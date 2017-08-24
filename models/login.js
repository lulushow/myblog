var mongodb = require("./connectDB");

var Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    phone: {type:String},
    email: {type: String},
    createDate: {type: Date}
});
var articleSchema = new Schema({
    username: {type: String},
    articleTime: {type: String},
    articleTitle: {type: String},
    articleContent: {type: String}
});

exports.userModel = mongodb.mongoose.model("userModel", userSchema);

exports.articleModel = mongodb.mongoose.model("articleModel", articleSchema);
console.log(mongodb.mongoose.model("userModel", userSchema));
