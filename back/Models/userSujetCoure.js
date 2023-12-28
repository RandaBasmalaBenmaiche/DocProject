const mongoose = require('mongoose')

const UserHistoriqueSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    sujet : [
        {
            moduleName : {type : string , required : true , default : null},
            question : {type : String , required : true , default : null},
            answer : {type : String , required : true , default : null},
            correctAnswer :{type : String , required : true , default : null},
            totalScore : {type : Number , required : true , default : null}
        }
    ]
}, {timestamps : true})

module.exports = mongoose.model('Userhistorique' , UserHistoriqueSchema)