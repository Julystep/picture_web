const express = require('express');

const fs = require('fs');

router = express.Router();

const User = require('../modules/user');

const Repertory = require('../modules/repertory');

const md5 = require('blueimp-md5');

const dirName = 'F:\\学术英语\\node.js\\picture_systerm\\repertoies'

router.get('/login',(req, res) => {
    res.render('login.html');
})

router.post('/login',async (req, res) => {
    const body = req.body;
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
      }, (err, user) => {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            message: err.message
          })
        }

        if (!user) {
          return res.status(200).json({
            err_code: 1,
            message: 'Email or password is invalid.'
          })
        }
    
        req.session.user = user;     //记载登录状态
        
        
        res.status(200).json({
          err_code: 0,
          message: 'OK'
        })
      })
})

router.get('/register', (req, res) => {
    res.render('register.html');
});

router.post('/register',async (req, res) => {
    const body = req.body;
    try{
        if(await User.findOne({email : body.email})){
            return res.status(200).json({
                err_code : 1,
                message : '邮箱已存在'
            });
        }
        if(await User.findOne({nickname : body.nickname})){
            return res.status(200).json({
                err_code : 2,
                message : '昵称已存在'
            });
        }

        body.password = md5(md5(body.password));

        await new User(body).save((err, user) => {
            path = dirName + '\\' + user.email;

            fs.mkdir(path, err => {
                if(err){
                    return res.status(500).json({
                        err_code : 500,
                        message : err.message
                    });
                }
            })
        });
        

        return res.status(200).json({
            err_code : 0,
            message : '注册成功'
        });

    }catch(err){
        return res.status(500).json({
            err_code : 500,
            message : err.message
        });
    }
});
 

router.get('/index', (req, res) => {
    Repertory.find({email : req.session.user.email}, (err, data) => {
        if(err){
            console.log('err: ' + err);
        }
        res.render('index.html',{
            Repertory : data
        });
    })
});

router.get('/logout', (req, res) => {
    req.session.user = null;

    res.redirect('/login');
});



module.exports = router;