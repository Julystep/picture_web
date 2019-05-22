const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homework_System', {useNewUrlParser : true});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    pwd:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['男', '女'],
        default: '男'
    },
    Class:{
        type: String,
        reqired: true
    }
})

module.exports = mongoose.model('User', userSchema);