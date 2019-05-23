const express = require('express');

const User = require('../mongo/User');

const md5 = require('blueimp-md5');

const fs = require('fs');

router = express.Router();

const dir = 'F:\\学术英语\\picture_web\\作业管理系统\\public\\Users'

router.get('/', (req, res) => {
    res.render('index.html');
})
router.post('/',async (req, res) => {
    const body = req.body;
    User.findOne({
        id: body.id,
        pwd: md5(md5(body.pwd))
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
})
router.post('/register', async (req, res) => {
    const body = req.body;
    try{
        if(await User.findOne({id: body.id})){
            return res.status(200).json({
                err_code: 1,
                message: '账号已存在'
            });
        }

        body.pwd = md5(md5(body.pwd));

        await new User(body).save((err, user) => {

            path = dir + '\\' + user.id;
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
            err_code: 500,
            message: err.message
        })
    }
})

router.get('/logout', (req, res) => {
    req.session.user = null;

    res.redirect('/');
});
module.exports = router;