const express  = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const session = require('express-session');

const router = require('./router/router-sign');

const router1 = require('./router/router-main');

const app = express();

app.engine('html', require('express-art-template'));

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false 
}))

app.use(router);
app.use(router1);


app.listen(4000, () => console.log('Server is running'));