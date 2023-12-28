const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    date: { type: String },
    annee: { type: String }
})
const CoursSchema = new mongoose.Schema({
    id: { type: String },
    module: { type: String },
    annee: { type: String },
    name: { type: String },
    date: { type: String }
})
const VideoSchema = new mongoose.Schema({
    id: { type: String },
    module: { type: String },
    coure: { type: String },
    annee: { type: String },
    name: { type: String },
    date: { type: String }
})
const AudioSchema = new mongoose.Schema({
    module: { type: String },
    annee: { type: String },
    name: { type: String },
    date: { type: String }
})

const HistorySchema = new mongoose.Schema({
    module: [ModuleSchema],
    cours: [CoursSchema],
    video: [VideoSchema],
    audio: [AudioSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, { timestamps: true })

module.exports = mongoose.model('History', HistorySchema)