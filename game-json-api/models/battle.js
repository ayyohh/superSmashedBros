const mongoose = require("mongoose");


const BattleSchema = mongoose.Schema({
    name: String,
    fighters: []
});

const Battle = mongoose.model("Battle", BattleSchema);
module.exports = Battle;