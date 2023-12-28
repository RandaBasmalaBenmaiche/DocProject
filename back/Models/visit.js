const mongoose = require('mongoose')

const VisitSchema = mongoose.Schema({
    visit : {type : String , default: "1"},
    date : {type : String }
})

module.exports = mongoose.model('Visit', VisitSchema)