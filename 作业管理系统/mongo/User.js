const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/HomeWork', {useNewUrlParser : true}, (err) => {
if(err){
    console.log("连接失败" + err.message);
}else console.log("连接成功");
});

const Schema = mongoose.Schema;

console.log('success');

const studentSchema = new Schema({
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

module.exports = mongoose.model('Student', studentSchema);
