const router = require('express').Router();
const sequelize = require('../config/connection');
const {Food, User} = require('../models');

// get all foods for pantry page
router.get('/', (req, res) => {
    console.log(req.session);
    Food.findAll({
        attributes: [
            'id',
            'food_name',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ['id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbFoodData => {
        const foods = dbFoodData.map(food => food.get({plain: true}));
        res.render('my-pantry', {foods, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;
