const mongoose = require('mongoose')

const AbonnementSchema = mongoose.Schema({
    Type : {type : String, require : true },
    Duree : {type : Number, require : true},
    Tarif : {type : Number, require : true},
    del : {type: Number, default: 0}
})

module.exports = mongoose.model('Abonnement', AbonnementSchema)