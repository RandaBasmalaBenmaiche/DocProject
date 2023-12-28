const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    
    lastName : {
        type : String,
        default : '',
    },
    firstName : {
        type : String,
        default : '',
    },
    userName: {
        type : String,
        default : '',
        unique: true,
    },
    wilaya : {
        type : String,
        default : '',
    },
    annee : {
        type : String,
        default : '',
    },
    email : {
        type : String,
        required : [true, 'please add you\'re email'],
        unique : true
    },
    adresse : {
        type : String,
        default : '',
    },
    telephone: {
        type: Number,
        default : '',
    },
    password : {
        type : String,
        required : [true, 'please add you\'re password']
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    isConnect : {
        type : Boolean,
        default : false
    },
    gold : {
        type : String,
        default : null
    },
    Debut : {
        type : String,
        
    },
    Fin : {
        type : String,
        default : null
    },
    del: {
        type : Number,
        defualt : 0
    }
    // module : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    //     default : null,
    //     ref : 'Modules'
    // },
}, {timestamps : true})

module.exports = mongoose.model('User' , UserSchema)