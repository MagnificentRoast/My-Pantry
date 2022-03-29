const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require("./homepage-routes");

router.use('/api', apiRoutes);
router.use("/", homepageRoutes);

// catch-all for bad endpoint requests
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;