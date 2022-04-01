const router = require('express').Router();
const {Pantry, User, Food} = require("../../models");

// Get all pantries
router.get("/", (req, res) => {
    Pantry.findAll()
    .then(pantryData => {
        console.log(pantryData);
        res.json(pantryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single pantry by ID
router.get("/:id", (req, res) => {
    Pantry.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Food
            }
        ]
    })
    .then(pantryData => {
        if (!pantryData) {
            res.status(404).json({message: "No pantry with this ID"});
            return;
        }
        console.log(pantryData);
        res.json(pantryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Post a new pantry - this should be done on user creation as well
router.post("/", (req, res) => {
    Pantry.create({
        user_id: req.body.user_id
    })
    .then(pantryData => {
        req.session.save(() => {
            req.session.pantry_id = pantryData.id;
            console.log(pantryData);
            res.json(pantryData);

            console.log("pantry id is " + req.session.pantry_id);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT - change pantry details - mainly used for updating its owner or name?

// DELETE - remove a pantry and its foods
router.delete("/:id", (req, res) => {
    Pantry.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(pantryData => {
        if (!pantryData) {
            res.status(404).json({message: "No pantry with this ID"});
            return;
        }
        console.log(pantryData);
        res.json(pantryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;