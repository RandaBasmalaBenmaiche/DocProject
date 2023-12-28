// const { string } = require('joi')
const mongoose = require('mongoose')

const CodeSchema = mongoose.Schema({
    codeValid : {type : String},
    uMail: {type : String}
})

module.exports = mongoose.model('Code', CodeSchema)