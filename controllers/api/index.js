const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const foodRoutes = require("./food-routes.js");

router.use('/users', userRoutes);
router.use("/foods", foodRoutes);

module.exports = router;