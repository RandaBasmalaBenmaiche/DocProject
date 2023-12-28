const Coure = require('../Models/Coure')
const multer = require('multer')
const fs = require("fs")
var path = require('path')
const directory = require('../uploads/directory');
const User = require('../Models/User');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// @desc get coure
// @route GET /api/coure
// @access Privet
const GetCoure = async (req, res) => {
    try {
        const coure = await Coure.find()
        if (coure.length === 0) {
            return res.status(204).send('no coure found')
        }
        res.status(200).json(coure)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc get specific coure
// @route GET /api/coure/:id
// @access Privet
const GetSpecificCoure = async (req, res) => {
    try {
        const { id } = req.params
        const coure = await Coure.findById(id)
        if (!coure) {
            return res.status(400).send('cour not found !')
        }
        res.status(200).json(coure)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc get specific coure
// @route GET /api/couremodule/:id
// @access Privet
const GetCoureModule = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.user.id)
        const coure = await Coure.find({ module: id, wilaya: user.wilaya })
        if (!coure) {
            return res.status(400).send('cour not found !')
        }
        res.status(200).json(coure)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc get specific coure
// @route GET /api/couremodule/:id
// @access Privet
const GetCoureModuleAnnee = async (req, res) => {
    try {
        const { id, annee } = req.params
        if (annee === "undefined" && id !== "undefined") {
            const coure = await Coure.find({ module: id })
            if (!coure) {
                return res.status(400).send('cour not found !')
            }
            return res.status(200).json(coure)
        }
        else if (id === "undefined" && annee !== "undefined") {
            const coure = await Coure.find({ annee: annee })
            if (!coure) {
                return res.status(400).send('cour not found !')
            }
            return res.status(200).json(coure)
        }
        else if (id !== "undefined" && annee !== "undefined") {
            const coure = await Coure.find({ module: id, annee: annee })
            if (!coure) {
                return res.status(400).send('cour not found !')
            }
            return res.status(200).json(coure)
        } else if (id === "undefined" && annee === "undefined") {
            const coure = await Coure.find()
            if (!coure) {
                return res.status(400).send('cour not found !')
            }
            return res.status(200).json(coure)
        }
    } catch (error) {
        console.log(error.message)
    }
}

// @desc create coure
// @route POST /api/coure/
// @access Privet
const CreateCoure = async (req, res) => {
    try {
        const { name, annee, wilaya, desc, module, video } = req.body
        if (!name || !annee || !desc || !wilaya || !module || !req.files.file || !req.files.file[0] || !req.files.file[0].originalname || !req.files.audio || !req.files.audio[0] || !req.files.audio[0].originalname || !video) {
            return res.status(400).send('please enter all fealds')
        }
        // const cours = await Coure.findOne({ name: name })
        // if (cours) {
        //     return res.status(400).send('Ce Modules Existe Déjà malheureusement !')
        // }

        const coure = await Coure.create({
            name: name,
            annee: annee,
            desc: desc,
            wilaya: wilaya.toLowerCase(),
            file: {
                data: req.files.file[0].originalname,
                contentType: req.files.file[0].mimetype,
            },
            audio: {
                data: req.files.audio[0].originalname,
                contentType: req.files.audio[0].mimetype,
            },
            video: JSON.parse(video),
            module: module
        })
        res.status(201).json(coure)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc edit coure
// @route PATCH /api/coure/:id
// @access Privet
const EditCoure = async (req, res) => {
    try {
        const { id } = req.params
        const file = req.files?.file?.[0]
        const audio = req.files?.audio?.[0]
        const data = req.body
        console.log(data)
        // console.log(file)
        // console.log(audio)
        let update = { ...data }
        console.log(update)
        const coure = await Coure.findById(id)
        if (!coure) {
            return res.status(204).send('coure not found')
        }
        if (file) {
            update = {
                ...update,
                file: {
                    data: req.files.file[0].originalname,
                    contentType: req.files.file[0].mimetype,
                }
            }
        }
        if (audio) {
            update = {
                ...update,
                audio: {
                    data: req.files.audio[0].originalname,
                    contentType: req.files.audio[0].mimetype,
                },
            }
        }
        if (update.video) {
            update = {
                ...update,
                video: JSON.parse(update.video)
            }
        }
        const coureUpdated = await Coure.findByIdAndUpdate(id, update, { new: true })
        res.status(201).json(coureUpdated)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc delete coure
// @route GET /api/coure/id
// @access Privet
const DeleteCoure = async (req, res) => {
    try {
        const { id } = req.params
        const coure = await Coure.findById(id)
        if (!coure) {
            return res.status(204).send('coure not found')
        }
        const coureDeleted = await Coure.findByIdAndUpdate(id, { del: 1}, { new: true })
        res.status(201).json(coureDeleted)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    GetCoure,
    GetSpecificCoure,
    GetCoureModule,
    GetCoureModuleAnnee,
    CreateCoure,
    EditCoure,
    DeleteCoure,
    upload
}