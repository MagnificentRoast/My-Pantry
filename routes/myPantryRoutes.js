const router = require('express').Router();

router.get('/myPantry', (req, res) => {
    res.render('my-pantry');
});

module.exports = router;