const router = require('express').Router();
const {Food, User} = require('../models');

// get all foods for pantry page
// router.get('/', (req, res) => {
//     console.log(req.session);
//     Food.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'food_name',
//             'user_id'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ["id", "username"]
//             }
//         ]
//     })
//     .then(dbFoodData => {
//         const foods = dbFoodData.map(food => food.get({plain: true}));
//         if (foods) {
//             console.log(foods[0].user.username);
//         }
//         res.render('my-pantry', {foods, loggedIn: true});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

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
