const router = require('express').Router();
const sequelize = require('../config/connection');
const {Food, Pantry, User} = require('../models');

// get all foods for pantry page
router.get('/', (req, res) => {
    console.log(req.session);
    Food.findAll({
        // where: {
//     pantry_id: req.session.pantry_id
// },   
        attributes: [
            'id',
            'food_name',
            'pantry_id'
        ],
        include: [
            {
                model: Pantry,
                attributes: ['id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
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

// where: {
//     pantry_id: req.session.pantry_id
// },