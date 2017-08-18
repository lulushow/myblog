var mongodb = require("./connectDB");

var Schema = mongodb.mongoose.Schema;

var registerSchema = new Schema({
    username: {type: String},
    password: {type: String},
    phone: {type:String},
    email: {type: String},
    articleInfo: {
        articleTime: {type: String},
        articleTitle: {type: String},
        articleContent: {type: String}
    }
});

var userModel =  mongodb.mongoose.model("userModel", registerSchema);

console.log(userModel);
module.exports = userModel;