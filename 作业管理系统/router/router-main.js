const express = require('express');

const User = require('../mongo/User');

const md5 = require('blueimp-md5');

const fs = require('fs');

var multer  = require('multer');
var upload = multer({ dest: 'upload/' });

router = express.Router();

router.get('/main', (req, res) => {
    res.render('main.html', {
        name: req.session.user.name
    })
})

router.get('/handIn', (req, res) => {
    res.render('handIn.html', {
        name: req.session.user.name
    })
})

router.post('/handIn', upload.any(), (req, res, next) => {
    console.log(req.body.name);
})

router.get('/handInHomeWork', (req, res) => {
    res.render('handInHomeWork.html', {
        name: req.session.user.name
    })
})

router.post('/handInHomeWork', upload.any(), (req, res) => {
    console.log(req.files);
})

module.exports = router;