const express = require('express')
const { emailCheck, getValidCode, deleteCode, EditMe } = require('../Controller/CodeController')
const Route = express.Router()

Route.route('/validate/:code').get(getValidCode) 
Route.route('/check/:email').get(emailCheck) 
Route.route('/edit/:email').patch(EditMe) 
Route.route('/delte/:email').delete(deleteCode) 

module.exports = Route