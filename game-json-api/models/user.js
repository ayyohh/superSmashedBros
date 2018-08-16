const mongoose = require("mongoose");
const Fighter = require("./fighter.js");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fighters: [],
});



module.exports = mongoose.model("User", UserSchema);
