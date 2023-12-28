const mongoose = require('mongoose')

const AnswersSchema = mongoose.Schema({
    rep: {
        type: String,
        default: ''
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
})


const QuestSchema = mongoose.Schema({
    sujetType: {
        type: String,
        default: ''
    },
    question: {
        type: String,
        default: ''
    },
    reponse : [AnswersSchema],
    del: {
        type: Number,
        default: 0
    },
})

const ModuleSujetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    date: {
        type: String, required: true
    },
    annee : {
        type: String, required: true
    },
    question: [QuestSchema],
    del: { type: Number, default: 0 },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'Modules'
    },
    coure: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'Coure'
    }
}, { timestamps: true })

module.exports = mongoose.model('Sujet', ModuleSujetSchema)