const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("Endpoint is working");
    res.render('my-pantry');
});

module.exports = router;