const express = require('express')
const { GetAbonnemnt, CreateAbonnemnt, GetSpecificAbonnemnt, UpdateAbonnemnt, DeleteAbonnemnt } = require('../Controller/AbonnementController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

// get post abonnement
Route.route('/').get(GetAbonnemnt).post(protectAdmin,CreateAbonnemnt)
// get update delete sepecific abonnement
Route.route('/:id').get(protect,GetSpecificAbonnemnt).patch(protectAdmin,UpdateAbonnemnt).delete(protectAdmin,DeleteAbonnemnt)

module.exports = Route