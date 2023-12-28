const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    Aadresse: {type : String},
    Ateleph: {type: Number},
    Aemail: {type: String}
}, { timestamps: true })

module.exports = mongoose.model("Admin", AdminSchema)