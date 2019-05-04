const express = require('express');

const fs = require('fs');

const Show = require('../modules/show');

var multer  = require('multer');
var upload = multer({ dest: 'upload/' });

router2 = express.Router();

const Repertory = require('../modules/repertory');

const dirName = 'F:\\学术英语\\node.js\\picture_systerm\\repertoies'

router2.get('/createRepertory', (req, res) => {
    res.render('./_repertories/createRepertory.html', {
        user : req.session.user
    });
});

router2.post('/createRepertory',async (req, res) => {
    let body = req.body;
    console.log(body);
    console.log(req.session.user.email)
    try{
        await Repertory.find({email : req.session.user.email}, (err, data) => {
            console.log(data);
            for(let i = 0; i < data[i]; i++){
                if(body.name === data[i].name){
                    return res.status(200).json({
                        err_code : 1
                    })
                }
            }
        })
        body.path = dirName + '\\' + body.email + '\\' + body.name ;
       
        await fs.mkdir(body.path, err => {
            if(err){
                console.log(err);
                return res.status(200).json({
                    err_code : 1
                })
            }
            new Repertory(body).save();
            return res.status(200).json({
                err_code : 0,
                message : '成功'
            })
        })
    }catch(err){
        return res.status(500).json({
            err_code : 500,
            message : '服务器故障'
        })
    }
})

router2.get('/check', (req, res) => {
    path = dirName + '\\' + req.session.user.email + '\\' + req.query.name
    
    fs.readdir(path, (err, files) => {
        if(err){
            return res.end('wrong');
        }
        return res.render('./_repertories/check.html',{
            name : req.query.name,
            files : files,
            email : req.session.user.email,
            ip : req.ip
        });
    })
});

router2.post('/Insert/picture', upload.single('file'), async (req, res, next) => {
    console.log(req.body);
    try{
        if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
            await fs.readFile( req.file.path, function (err, data) {
                if(err){
                    return res.status(200).json({
                        err_code : 4,
                        messgae : "读取文件失败"
                    })
                }
                path = dirName + '\\' + req.session.user.email + '\\' + req.body.name + '\\' + req.file.originalname;

    
              fs.writeFile(path, data, function (err) {
                    if( err ){
                        console.log(err);
                        return res.status(200).json({
                            err_code : 3,
                            messgae : "写文件失败"
                        })
                    }
                    return res.status(200).json({
                        err_code : 0,
                        messgae : "成功"
                    })
                });
            });
        }else{
            return res.status(200).json({
                err_code : 1,
                messgae : "文件格式不正确"
            })
        }
    }catch(err){
        return res.status(500).json({
            err_code : 500,
            message : err.message
        })
    }
})

router2.post('/handup', upload.any(), async (req, res) => {
   try{
       
        req.body.email = req.session.user.email;
        req.body.src = req.body.pictures;
        req.body.nickname = req.session.user.nickname;
        await Show(req.body).save((err, Show) => {
            if(err){
                console.log(err);
                return res.status(200).json({
                    err_code : 1,
                    message : err.message
                })
            }
                return res.status(200).json({
                    err_code : 0,
                    message : '成功'
                })
        })
    }catch(err){
        if(err){
            return res.status(500).json({
            err_code : 500,
            message : err.message
        })
        }
    }
})

router2.get('/showComments', (req, res) => {
    Show.find((err, data) => {
        if(err){
            console.log(err);
        }
        res.render('./talk/Comments.html',{
            data : data
        });
    })
})

router2.get('/show/details', (req, res) => {
    id = req.query.id.replace(/\"/g, "");
    Show.findById(id, (err, data) => {
        if(err){
            console.log(err);
        }
        res.render('./talk/showDetail.html',{
            data : data
        })
    })
})

router2.get('/output', (req, res) => {
    id = req.query.id.replace(/\"/g, "");
    Show.findById(id, (err, data) => {
        if(err){
            return es.status(200).json({
                err_code : 1,
                message : err.message
            })
        }
        data.nickname1[data.nickname1.length] = req.session.user.nickname;
        data.discuss[data.discuss.length] = req.query.discuss;
        Show(data).save();
        return res.status(200).json({
            err_code : 0,
            data : data,
            message : '成功'
        })
    })
})

router2.get('/output1',upload.any(), (req, res, next) => {
    console.log(req.query.id);
    id = req.query.id.replace(/\"/g, "");
    Show.findById(id, (err, data) => {
        if(err){
            return es.status(200).json({
                err_code : 1,
                message : err.message
            })
        }
        data.nickname1[data.nickname1.length] = req.session.user.nickname;
        data.discuss[data.discuss.length] = req.query.discuss;
        return res.status(200).json({
            err_code : 0,
            data : data,
            message : '成功'
        })
    })
})




module.exports = router2;