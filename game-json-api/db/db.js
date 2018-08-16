const mongoose = require("mongoose");


mongoose.connect("mongodb://sudoUser:fuckb3anch3z@ds115472.mlab.com:15472/smashedbros");

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected")
});

mongoose.connection.on("error", (err) => {
    console.log(err, "Mongoose failed to connect")
});

mongoose.connection.on("disconected", () => {
    console.log("Mongoose is disconnected")
});
