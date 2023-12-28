const express = require('express')
const { GetAnnee, PostAnnee, DeleteAnnee, PatchAnnee, GetIdAnnee } = require('../Controller/AnneeController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

// get post annee
Route.route('/').get(GetAnnee).post(protectAdmin,PostAnnee)
// edit delete get specific annee
Route.route('/:id').get(protect,GetIdAnnee).patch(protectAdmin,PatchAnnee).delete(protectAdmin,DeleteAnnee)

module.exports = Route