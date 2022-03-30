const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require("./homepage-routes.js");
const myPantryRoutes = require("./myPantry-routes.js")

router.use("/", homepageRoutes);
router.use("/myPantry", myPantryRoutes);
router.use('/api', apiRoutes);

// catch-all for bad endpoint requests
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;