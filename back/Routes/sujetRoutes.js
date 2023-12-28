const express = require('express')
const { GetSujets, CreateSujets, EditSujets, DeleteSujets, GetSpecificSujets, GetSujetsModule, GetSpecificSujetsModule, updateSujets, EditquestionSujets, DeleteQest } = require('../Controller/SujetController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

// get post sujet route
Route.route('/').get(protect,GetSujets).post(protectAdmin,CreateSujets)
// get post sujet route
Route.route('/sujetmodule/:id/:titre/:anneeStart/:anneeEnd/:coure/:type/:source').get(protect,GetSujetsModule)
Route.route('/sujetmodul/:id').get(protect,GetSpecificSujetsModule)
Route.route('/update/:id').patch(protect,updateSujets)
Route.route('/updateQuest/:id').patch(protect,EditquestionSujets)
// update delete sujet route
Route.route('/:id').get(protect,GetSpecificSujets).patch(protectAdmin,EditSujets).delete(protectAdmin,DeleteSujets)
Route.route('/delquest/:id/:qsId/:position').delete(protectAdmin,DeleteQest)
module.exports = Route