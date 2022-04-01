const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/my-pantry');
      return;
    }
  
    res.render('my-pantry');
  });

module.exports = router;