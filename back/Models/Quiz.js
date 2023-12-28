const mongoose = require('mongoose')

const ReponseSchema = mongoose.Schema({
    _id : {type :  String,required : true},
    rep : {type :  String,required : true},
    isCorrect : {type :  Boolean,required : true,default : false}
})

const CorectSchema = mongoose.Schema({
    id : {type :  String,required : true},
})

const ChekSchema = mongoose.Schema({
    id : {type :  String,required : true},
})

const QuestionSchema = mongoose.Schema({
    question : {type : String, requierd : true},
    reponse : [ReponseSchema],
    corect : [CorectSchema],
    chek : [ChekSchema],
    time : {type : String, requierd : true , default : null},
    corection : {type : String, requierd : true , default : 'null'},
})

const qsSchema = mongoose.Schema({
    id : {type : String , required : true},
    type : {type : String , required : true},
    qs : QuestionSchema,
})

const QuizSchema = mongoose.Schema({
    titre : {type : String , required : true},
    type : [{type : String , required : true}],
    date: {type : String , required : true},
    annee : [{type : String , required : true}],
    source : [{type : String , required : true}],
    module : {type : String , required : true},
    anneeScol : {type : String , required : true},
    questions:[qsSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('Quiz' , QuizSchema)