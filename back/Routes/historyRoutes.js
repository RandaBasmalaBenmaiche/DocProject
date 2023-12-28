const express = require('express')
const { userHistory, getUserHistory, deletecourHistory, deletevideoHistory } = require('../Controller/HistoryController')
const { protect } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

Route.route('/').get(protect,getUserHistory).post(protect,userHistory)
Route.route('/cour/:id').delete(protect,deletecourHistory)
Route.route('/video/:id').delete(protect,deletevideoHistory)

module.exports = Route