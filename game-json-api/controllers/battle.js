const express = require("express");
const router = express.Router();
const Battle = require("../models/battle");


// Index Route
router.get("/", async (req, res, next) => {
    console.log("This is get all in controllers/battle.js:", req.session)
    try {
        const allBattles = await Battle.find();
        res.json({
            status: 200,
            data: allBattles
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// New Route
router.post("/", async (req, res) => {
    console.log("This is req.session in the post route of controllers/battle.js:", req.session);
    try {
        console.log("This is req.body in controllers/battle.js:", req.body);
        const createdBattle = await Battle.create(req.body);
        res.json({
            status: 200,
            data: cratedBattle
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Show Route
router.get("/:id", async (req, res, next) => {
    try {
        const foundBattle = await Battle.findById(req.params.id);
        res.json({
            status: 200,
            data: foundBattle
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Edit Route
router.put("/:id", async (req, res) => {
    try {
        const updatedBattle = await Battle.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 200,
            data: updatedBattle
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Delete Route
router.delete("/:id", async (req, res) => {
    try {
        const deletedBattle = await Battle.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedBattle
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


module.exports = router;