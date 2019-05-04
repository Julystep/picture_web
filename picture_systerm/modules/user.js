const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picture_system', {useNewUrlParser : true});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true 
    },
    password : {
        type : String,
        required : true
    },
    nickname : {
        type : String,
        required : true
    },
    tele : {
        type :String,
        required : true
    },
    gender : {
        type : String,
        enum : ['男', '女'],
        default : '男'
    },
    avatar : {
        type : String,
        default: '/public/img/123.jpg'
    }
})

module.exports = mongoose.model('User', userSchema);
