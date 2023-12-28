const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , required : true , default : null},
    module : {type : mongoose.Schema.Types.ObjectId , required : true , default : null},
    score : {type : Number , required : true , default : 0}
})

module.exports = mongoose.model("Score" , ScoreSchema)