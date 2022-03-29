const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const pantryRoutes = require("./pantry-routes.js");
const foodRoutes = require("./food-routes.js");

router.use('/users', userRoutes);
router.use("/pantry", pantryRoutes);
router.use("/foods", foodRoutes);

module.exports = router;