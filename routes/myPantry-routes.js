const router = require('express').Router();
// const sequelize = require('../config/connection');
// const {Food, Pantry, User} = require('../models');

console.log("hello");

router.get('/myPantry', (req, res) => {
    res.render('my-pantry');
});

module.exports = router;