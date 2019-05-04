const express = require('express');

router1 = express.Router();

const User = require('../modules/user');

const md5 = require('blueimp-md5');

router.get('/userInfo', (req, res) => {

    res.render('./userInfo/userInfo.html', {
        user: req.session.user
    });
});

router1.get('/user/editInfo', (req, res) => {
    
    res.render('./userInfo/userEditInfo.html', {
        user: req.session.user
    });
});

router1.post('/user/editInfo',async (req, res) => {
    let body = req.body;

    
    User.findOne({
        nickname : body.nickname
    }, (err, data) => {
       
       
        if(err){
            res.status(500).json({
                err_code : 500,
                message : err.message
            });
        }
        if(data){
            res.status(200).json({
                err_code : 2,
                message : "昵称重复"
            })
        }

        User.findByIdAndUpdate(req.session.user._id,body, (err) => {
            if(err){
                res.status(500).json({
                    err_code : 500,
                    message : err.message
                });
            }
            
            User.findById(req.session.user._id, (err, user) => {
                if(err){
                    res.status(500).json({
                        err_code : 500,
                        message : err.message
                    });
                }
                else{
                    req.session.user = user;
                    
                    res.status(200).json({
                        err_code : 0,
                        message : '修改成功'
                    });
                }
            })
        })
    })
});

router1.get('/user/editPwd', (req, res) => {

    res.render('./userInfo/userEditPwd.html');
})

router1.post('/user/editPwd',async (req, res) => {
    let body = req.body;

    if(await body.password !== body.SecondPassword){
        return res.status(200).json({
            err_code : 1,
            message : '密码不相同'
        });
    }

    body.password = md5(md5(body.password));

    console.log(body);

    await User.findByIdAndUpdate(req.session.user._id, body, err => {
        if(err){
            return res.status(500).json({
                err_code : 500,
                message : err.message
            });
        }
        else{
            return res.status(200).json({
                err_code : 0,
                message : '成功'
            });
        }
    });
    

})

module.exports = router1;