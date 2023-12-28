const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    file : {
        data : String,
        contentType : {
            type: String,
            required: true,
            default :null
        }
    },
    annee : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true,
        default : null
    },
    del : {
        type : Number,
        default : 0
    }
    // user : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    //     ref : 'User'
    // },
    // sujet : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     required : true,
    //     default : null,
    //     ref : 'Sujet'
    // }
}, {timestamps : true})

module.exports = mongoose.model('Modules' , ModuleSchema)