const express = require("express");
const router = express.Router();
const User = require("../models/user");


// Index Route
router.get("/", async (req, res, next) => {
    console.log("This is get all in controllers/user.js:", req.session)
    try {
        const allUsers = await User.find();
        res.json({
            status: 200,
            data: allUsers
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// New Route
router.post("/", async (req, res) => {
    console.log("This is req.session in the post route of controllers/user.js:", req.session);
    try {
        console.log("This is req.body in controllers/user.js:", req.body);
        const createdUser = await User.create(req.body);
        res.json({
            status: 200,
            data: cratedUser
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Show Route
router.get("/:id", async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.json({
            status: 200,
            data: foundUser
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Edit Route
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 200,
            data: updatedUser
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Delete Route
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedUser
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


module.exports = router;