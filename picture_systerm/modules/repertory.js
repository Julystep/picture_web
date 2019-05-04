const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picture_system', {useNewUrlParser : true});

const Schema = mongoose.Schema;

const repertorySchema = new Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    createDate : {
        type : Date,
        default : Date.now
    },
    path : {
        type : String,
        required : true
    },
    sign : {
        type : String,
        required : false,
        default : ''
    }
})

module.exports = mongoose.model('Repertory', repertorySchema);
