const express = require('express')
const { regesterUser, getUser, loginUser, deletUser, getMe, EditUser, CreatetUser, GetUserAnneeAbonnement,EditMe, logout, checkUserAb } = require('../Controller/UserController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

//get user route
Route.route('/').get(protectAdmin,getUser).post(protectAdmin,CreatetUser)
//get me 
Route.route('/checkAnis').get(protect,checkUserAb)
Route.route('/profile').get(protect,getMe)

//get GetUserAnneeAbonnement
Route.route('/userfilter/:Abonnement/:annee').get(protectAdmin,GetUserAnneeAbonnement)
//signin user route
Route.post('/regester',regesterUser)
//signup user route
Route.post('/login',loginUser)
//logout user
Route.route('/logout').get(protect,logout)

Route.route('/edit/:id').patch(protect,EditMe)
//get update delete user route
Route.route('/:id').get(protect,getMe).patch(protect,EditUser).delete(protectAdmin,deletUser)

module.exports = Route