const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

require("./db/db");
app.use(session({
    secret: "git gud",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


const authController = require("./controllers/auth");
const battleController = require("./controllers/battle");
const fighterController = require("./controllers/fighter");
const userController = require("./controllers/user");

app.use("/api/v1/battles", battleController);
app.use("/api/v1/fighters", fighterController);
app.use("/api/v1/users", userController);
app.use("/auth", authController);

app.listen(9000, () => {
    console.log("listening on port 9000");
});