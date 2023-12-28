const express = require('express')
const {upload, GetModule, CreateModule, GetSpecificModule, EditModule, DeleteModule, GetModuleByUser, FilterModuleByAnnee, FilterModuleByAnneeadmin } = require('../Controller/ModuleController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

//get and post module route
Route.route('/').get(protect,GetModule).post(protectAdmin,upload.single('file'),CreateModule)
// get user module 
Route.route('/moduleUser').get(protect,GetModuleByUser)
// get module by annee
Route.route('/gold/annee/:annee').get(protect,FilterModuleByAnnee)
Route.route('/admin/annee/:annee').get(protect,FilterModuleByAnneeadmin)
//get specific module update delet module route
Route.route('/:id').get(protect,GetSpecificModule).patch(protectAdmin,upload.single('file'),EditModule).delete(protectAdmin,DeleteModule)

module.exports = Route