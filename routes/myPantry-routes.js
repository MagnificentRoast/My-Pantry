const router = require('express').Router();
const sequelize = require('../config/connection');
const {Food, Pantry, User} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Food.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    res.render('my-pantry');
});

module.exports = router;