const mongoose = require('mongoose')

const videoContent = mongoose.Schema({
    videoID: {
        type: String
    },
    videoTitle: {
        type: String
    }
})

const CoureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    annee: {
        type: String,
        required: true
    },
    wilaya: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    file: {
        data: String,
        contentType: {
            type: String,
            required: true
        }
    },
    audio: {
        data: String,
        contentType: {
            type: String,
            required: true
        }
    },
    video: [videoContent],
    del: {
        type: Number,
        default: 0
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'Modules'
    }
}, { timestamps: true })

module.exports = mongoose.model('Coure', CoureSchema)