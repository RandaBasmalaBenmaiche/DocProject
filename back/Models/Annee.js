const mongoose = require('mongoose')

const AnneeSchema = mongoose.Schema({
    annee: { type: String, required: true },
    del : {type: Number, default: 0}
})

module.exports = mongoose.model("Annee", AnneeSchema)