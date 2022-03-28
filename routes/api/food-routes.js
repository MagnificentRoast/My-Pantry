const router = require('express').Router();
const {Food, Pantry} = require("../../models");

// Get all foods
router.get("/", (req, res) => {
    Food.findAll({
    })
    .then(foodData => {
        console.log(foodData);
        res.json(foodData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get single food by ID
router.get("/:id", (req, res) => {
    Food.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(foodData => {
        if (!foodData) {
            console.log("No food with this ID");
            res.status(404).json({message: "No food with this ID"});
        }
        console.log(foodData);
        res.json(foodData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a new food
router.post("/", (req, res) => {
    Food.create({
        food_name: req.body.food_name,
        pantry_id: req.body.pantry_id
    })
    .then(foodData => {
        console.log(foodData);
        res.json(foodData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Put (modify) food attributes

// Delete a food
router.delete("/:id", (req, res) => {
    Food.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(foodData => {
        if (!foodData) {
            console.log("No food with this ID");
            res.status(404).json({message: "No food with this ID"});
        }
        console.log(foodData);
        res.json(foodData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;