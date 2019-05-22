const express = require('express');

const User = require('../mongo/User');

router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
})
router.post('/', (req, res) => {
    console.log(req.body);
})
router.get('/register', (req, res) => {
    res.render('register.html');
})
module.exports = router;