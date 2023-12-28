const Annee = require('../Models/Annee')
const Modules = require('../Models/Modules')

//@desc get annee
//@route /api/annee
//@access privet
const GetAnnee = async (req, res) => {
    try {
        const annee = await Annee.find()
        if (annee[0] == null) {
            return res.status(400).send('nothing found , you need to add annee first !!')
        }
        res.status(200).json(annee)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc get specific annee
//@route /api/annee/
//@access privet
const GetIdAnnee = async (req, res) => {
    try {
        const {id} = req.params
        const annee = await Annee.findById(id)
        if (!annee){
            return res.status(400).send('annee not found !')
        }
        res.status(200).json(annee)
    } catch (error) {
        console.log(error.message)
    }
}

//@desc post annee
//@route /api/annee/
//@access privet
const PostAnnee = async (req, res) => {
    try {
        const { annee } = req.body
        if (!annee) {
            res.status(400).send('enter all feald please')
        }
        const anneeExist = await Annee.findOne({ annee: annee })
        if (anneeExist) {
            return res.status(400).send('Cette Année Existe Déjà malheureusement !')
        }
        const Anne = await Annee.create({
            annee: annee
        })
        res.status(201).json(Anne)
    } catch (error) {
        console.log(error.message)
    }
}

//@desc update annee
//@route /api/annee/:id
//@access privet
const PatchAnnee = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const anne = await Annee.findById(id)
        if (!anne) {
            return res.status(400).send('annee not found !')
        }
        const anneeUpdated = await Annee.findByIdAndUpdate(id , data, { new: true })
        res.status(201).json(anneeUpdated)
    } catch (error) {
        console.log(error.message)
    }
}

//@desc delete annee
//@route /api/annee/:id
//@access privet
const DeleteAnnee = async (req, res) => {
    try {
        const {id} = req.params
        const annee = await Annee.findById(id)
        console.log(annee.annee)
        if (!annee) {
            return res.status(400).send('annee not found !')
        }
        const modules = await Modules.find()
        if (!modules){
            return res.status(400).semd('no module found')
        }
        const check = modules.filter(item => item.annee == annee.annee)
        console.log(check)
        if (check.length > 0){
            return res.status(500).send('Cette Année contient des modules ,malheureusement vous pouvez pas la supprimer !')
        }
        const anneeDeleted = await Annee.findByIdAndUpdate(id, {del: 1})
        res.status(200).json(anneeDeleted)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    GetAnnee,
    GetIdAnnee,
    PostAnnee,
    PatchAnnee,
    DeleteAnnee
}