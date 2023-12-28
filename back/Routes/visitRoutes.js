const express = require('express')
const { addVisit } = require('../Controller/VisitController')
const { protect } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

Route.route('/').post(addVisit)

module.exports = Route