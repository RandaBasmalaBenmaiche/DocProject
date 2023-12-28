const express = require('express')
const { AddQuiz, GetQuizById, UpdateQuiz, GetQuiz, ByIdGetQuiz, DeleteQuiz } = require('../Controller/QuizController')
const { protect } = require('../middleware/useAuthrMiddelware')
const Route = express.Router()

// quiz get and post
Route.route('/').get(protect,GetQuiz).post(protect,AddQuiz)
// get specific quiz
Route.route('/userquiz').get(protect,GetQuizById)
// edit delete quiz
Route.route('/:id').get(protect,ByIdGetQuiz).patch(protect,UpdateQuiz).delete(protect,DeleteQuiz)
module.exports = Route