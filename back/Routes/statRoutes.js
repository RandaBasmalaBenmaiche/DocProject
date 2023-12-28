const express = require('express')
const { GetQuizStatBytime, GetQuizStatByModuleAndTime, GetQuizStatByTimeAndAnnee, GetQuizStatByModuleAndTimeAndAnnee, GetModulesStatByTime, GetModulesStatByModuleAndTime, GetModulesStatByModuleAndAnnee, GetModulesStatByModuleAndTimeAndAnnee, adminGeneralStat, adminUserStat, adminAbb, adminUsersStatByTime, adminUsersStatByTimeAndAnnee, adminTraficStatByTime, adminTraficChart, getQuizHome, adminConsultStatByTime, adminConsultStatByTimeAndModule, adminConsultStatByTimeAndType, adminConsultStatByTimeAndAnnee, adminConsultStatByTimeAndAnneeAndType, adminConsultStatByTimeAndModuleAndAnnee, adminConsultStatByTimeAndModuleAndType, adminConsultStatByTimeAndModuleAndAnneeAndType } = require('../Controller/StatController')
const { protect, protectAdmin } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()


//get quiz stat
Route.route('/quiz/time/:time').get(protect,GetQuizStatBytime)
Route.route('/quiz/home').get(protect,getQuizHome)
Route.route('/quiz/time/module/:module/:time').get(protect,GetQuizStatByModuleAndTime)
Route.route('/quiz/time/module/annee/:module/:time/:annee').get(protect,GetQuizStatByModuleAndTimeAndAnnee)
Route.route('/quiz/time/annee/:time/:annee').get(protect,GetQuizStatByTimeAndAnnee)
//get module stat
Route.route('/modules/time/:time').get(protect,GetModulesStatByTime)
Route.route('/modules/time/:module/:time').get(protect,GetModulesStatByModuleAndTime)
Route.route('/modules/time/annee/:module/:time/:annee').get(protect,GetModulesStatByModuleAndTimeAndAnnee)
Route.route('/modules/time/annee/:time/:annee').get(protect,GetModulesStatByModuleAndAnnee)
//get admin stat
Route.route('/admin/general').get(protectAdmin,adminGeneralStat)
Route.route('/admin/trafic').get(protectAdmin,adminTraficChart)
Route.route('/admin/Usergeneral').get(protectAdmin,adminUserStat)
Route.route('/admin/abb').get(protectAdmin,adminAbb)
Route.route('/admin/visitor/:time').get(protectAdmin,adminTraficStatByTime)
Route.route('/admin/users/:time').get(protectAdmin,adminUsersStatByTime)
Route.route('/admin/users/annee/:time/:annee').get(protectAdmin,adminUsersStatByTimeAndAnnee)
Route.route('/admin/consult/:time').get(protectAdmin,adminConsultStatByTime)
Route.route('/admin/consult/module/:time/:module').get(protectAdmin,adminConsultStatByTimeAndModule)
Route.route('/admin/consult/user/type/:time/:type').get(protectAdmin,adminConsultStatByTimeAndType)
Route.route('/admin/consult/annee/:time/:annee').get(protectAdmin,adminConsultStatByTimeAndAnnee)
Route.route('/admin/consult/user/annee/:time/:annee/:type').get(protectAdmin,adminConsultStatByTimeAndAnneeAndType)
Route.route('/admin/consult/module/annee/:time/:module/:annee').get(protectAdmin,adminConsultStatByTimeAndModuleAndAnnee)
Route.route('/admin/consult/module/user/:time/:module/:type').get(protectAdmin,adminConsultStatByTimeAndModuleAndType)
Route.route('/admin/consult/module/annee/user/:time/:module/:annee/:type').get(protectAdmin,adminConsultStatByTimeAndModuleAndAnneeAndType)

module.exports = Route