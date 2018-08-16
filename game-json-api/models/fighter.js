const mongoose = require("mongoose");


const FighterSchema = new mongoose.Schema({
    archetype: String,
    img: String,
    name: String,
    hp: Number,
    def: Number,
    str: Number,
    dex: Number,
    int: Number,
    atk: Number,
    userGivenName: String,
});



module.exports = mongoose.model("Fighter", FighterSchema);
