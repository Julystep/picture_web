const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picture_system', {useNewUrlParser : true});

const Schema = mongoose.Schema;

const showSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    createDate : {
        type : Date,
        default : Date.now
    },
    main : {
        type : String,
        required : true
    },
    src : [
        {
            type : String,
            required : true
        }
    ],
    nickname : {
        type : String,
        required : true
    },
    nickname1 : [
        {
            type :String
        }
    ],
    discuss : [
       {
           type :String
       }
    ]
})

module.exports = mongoose.model('Show', showSchema);
