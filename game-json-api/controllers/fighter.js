const express = require("express");
const router = express.Router();
const Fighter = require("../models/fighter");


// Index Route
router.get("/", async (req, res, next) => {
    console.log("This is get all in controllers/fighter.js:", req.session)
    try {
        const allFighters = await Fighter.find();
        res.json({
            status: 200,
            data: allFighters
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// New Route
router.post("/", async (req, res) => {
    console.log("This is req.session in the post route of controllers/fighter.js:", req.session);
    try {
        console.log("This is req.body in controllers/fighter.js:", req.body);
        const createdFighter = await Fighter.create(req.body);
        res.json({
            status: 200,
            data: createdFighter
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Show Route
router.get("/:id", async (req, res, next) => {
    try {
        const foundFighter = await Fighter.findById(req.params.id);
        res.json({
            status: 200,
            data: foundFighter
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Edit Route
router.put("/:id", async (req, res) => {
    try {
        const updatedFighter = await Fighter.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 200,
            data: updatedFighter
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Delete Route
router.delete("/:id", async (req, res) => {
    try {
        const deletedFighter = await Fighter.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedFighter
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


module.exports = router;