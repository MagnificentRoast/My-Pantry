// create server using express and sequelize on port 3001
const express = require('express');
const routes = require ('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// adding handlebars.js
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// adding session
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret:'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);
// using session
app.use(session(sess));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});