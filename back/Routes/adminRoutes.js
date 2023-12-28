const express = require('express')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const { AddAdmin, GetAdmin, PatchAdmin, DeleteAdmin } = require('../Controller/AdminController')
const Route = express.Router()

// get post annee
Route.route('/').get(protect,GetAdmin).post(protectAdmin,AddAdmin)
// edit delete get specific annee
Route.route('/:id').patch(protectAdmin,PatchAdmin).delete(protectAdmin,DeleteAdmin)

module.exports = Route