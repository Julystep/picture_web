const express = require('express');

const path = require('path');

const router = require('./routes/router');

const router1 = require('./routes/router-info');

const router2 = require('./routes/router-repertory');

const bodyParser = require('body-parser');

var session = require('express-session');

const app = express();

app.engine('html', require('express-art-template'));

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.use('/repertoies/', express.static(path.join(__dirname, './repertoies/')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false 
    }))

app.use(router);
app.use(router1);
app.use(router2);

app.listen(3000, () => console.log('Server is running'));