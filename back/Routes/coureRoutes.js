const express = require('express')
const { upload, CreateCoure, GetCoure, GetSpecificCoure, EditCoure, DeleteCoure, GetCoureModule, GetCoureModuleAnnee } = require('../Controller/CoureController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

// get post coure route
Route.route('/').get(protect,GetCoure).post(protectAdmin,upload.fields([{ name: 'file', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), CreateCoure)
// get specific coure module anneee
Route.route('/couremoduleannee/:id/:annee').get(protect,GetCoureModuleAnnee)
// get specific coure module
Route.route('/couremodule/:id').get(protect,GetCoureModule)
// get specific coure edit delete route
Route.route('/:id').get(protect,GetSpecificCoure).patch(protectAdmin,upload.fields([{ name: 'file', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),EditCoure).delete(protectAdmin,DeleteCoure)

module.exports = Route