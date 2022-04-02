const router = require('express').Router();
const {Food, User} = require('../models');

// GET all foods for pantry page by user
router.get("/", (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Food,
                attributes: ["id", "food_name"]
            }
        ]
    })
    .then(userData => {
        // const user = userData.map(user => user.get({plain: true}));
        const user = userData.get({plain: true});
        const foods = user.food;
        res.render("my-pantry", {user, foods, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
