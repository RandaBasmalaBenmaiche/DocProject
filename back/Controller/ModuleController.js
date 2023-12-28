const Modules = require('../Models/Modules')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require("fs")
var path = require('path')
const directory = require('../uploads/directory');

//upload files
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

// @desc get module
// @route GET /api/module
// @access Privet
const GetModule = async (req, res) => {
    try {
        const module = await Modules.find()
        if (module.length === 0) {
            return res.status(204).send('no module found please create modules first !')
        }
        res.status(200).json(module)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc get specific module
// @route GET /api/module/id
// @access Privet
const GetSpecificModule = async (req, res) => {
    try {
        const { id } = req.params
        const module = await Modules.findById(id)
        if (!module) {
            return res.status(400).send('module not found')
        }
        res.status(200).json(module)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc get user module
// @route GET /api/moduleUser/id
// @access Privet
const GetModuleByUser = async (req, res) => {
    try {
        //token from headers
        let token = req.headers.authorization.split(' ')[1]
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //get user annee from the token
        const userAnnee = await User.findById(decoded.id).select('annee')
        const annee = userAnnee.annee
        console.log(userAnnee.annee)

        //fetching for module
        const module = await Modules.find({ annee: annee })
        if (!module) {
            return res.status(400).send('module not found')
        }
        console.log(module)
        res.status(200).json(module)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc crete module
// @route POST /api/module
// @access Privet
const CreateModule = async (req, res) => {
    try {
        const { name, annee ,desc } = req.body
        if (!name || !annee ||!desc) {
            return res.status(400).send('enter all fealdes please')
        }
        const modules = await Modules.findOne({name :name})
        if (modules){
            console.log('exist !')
            return res.status(400).send('Ce Modules Existe Déjà malheureusement !')
        }
        const module = await Modules.create({
            name: name,
            file :{
                data: req.file.originalname,
                contentType: req.file.mimetype,
            },
            annee: annee,
            desc: desc
        })
        res.status(201).json(module)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc Edit module
// @route PATCH /api/module/id
// @access Privet
const EditModule = async (req, res) => {
    try {
        const { id } = req.params
        const file = req.file
        const data = req.body
        let update = {...data}
        const module = await Modules.findById(id)
        if (!module) {
            return res.status(400).send('module not found')
        }
        if(file){
            update = {
                ...update,
                file :{
                    data: req.file.originalname,
                    contentType: req.file.mimetype,
                }
            }
        }
        console.log(update)
        console.log(module)
        const moduleUpdated = await Modules.findByIdAndUpdate(id, update, { new: true })
        console.log(moduleUpdated)
        res.status(201).json(moduleUpdated)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc Delete module
// @route DELETE /api/module/:id
// @access Privet
const DeleteModule = async (req, res) => {
    try {
        const { id } = req.params
        const module = await Modules.findById(id)
        if (!module) {
            return res.status(400).send('module not found')
        }
        const moduleDeleted = await Modules.findByIdAndUpdate(id,{del : 1}, {new: true})
        // const moduleDeleted = await Modules.findByIdAndRemove(id)
        res.status(201).json(moduleDeleted)
    } catch (error) {
        console.log(error.message)
    }
}

//---------------------------------------------------
// GPLD USER

// @desc module for gold user option annee
// @routr GET /api/module/gold/annee/:annee
// @access Privet

const FilterModuleByAnnee = async (req, res)=>{
    try {
        const {annee} = req.params
    
        // finding the module by the annee
        const module = await Modules.find({annee: annee})
        if(!module){
            return res.status(400).send('module not found')
        }
        res.status(200).json(module)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc module for gold user option annee
// @routr GET /api/module/admin/:annee
// @access Privet

const FilterModuleByAnneeadmin = async (req, res)=>{
    try {
        const {annee} = req.params
        console.log(annee)
        // finding the module by the annee
        const module = await Modules.find({annee: annee})
        if(!module){
            return res.status(400).send('module not found')
        }
        res.status(200).json(module)
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    GetModule,
    GetSpecificModule,
    GetModuleByUser,
    FilterModuleByAnnee,
    FilterModuleByAnneeadmin,
    CreateModule,
    EditModule,
    DeleteModule,
    upload
}