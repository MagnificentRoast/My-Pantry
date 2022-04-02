const router = require('express').Router();
const {Food, User} = require('../models');

// get all foods for pantry page
router.get('/', (req, res) => {
    console.log(req.session);
    Food.findAll({
        where: {
            user_id: req.session.id
        },
        attributes: [
            'id',
            'food_name',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            }
        ]
    })
    .then(dbFoodData => {
        console.log(dbFoodData);
        const foods = dbFoodData.map(food => food.get({plain: true}));
        res.render('my-pantry', {foods, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
