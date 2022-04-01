const {User, Pantry} = require("../../models");

const router = require('express').Router();

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        });
    });


// GET a single user
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Pantry
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({message: "No user found with this id"});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})


// Create a new user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            console.log(userData);
            res.json(userData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

// POST request to log in
router.post("/login", (req, res) => {
    
})

// Modify existing user data
router.put("/:id", (req, res) => {
    User.update(
        {
            // For now just update username and pantry_id
            username: req.body.username,
            pantry_id: req.body.pantry_id
        },
        {
        where: 
            {
                id: req.params.id
            }
        }
    )
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: "No user found with this id"});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: "No user found with this id"});
            return;
        }
        console.log(userData);
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;