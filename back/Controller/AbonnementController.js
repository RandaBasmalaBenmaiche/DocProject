const Abonnement = require('../Models/Abonnement')

//@desc get Abonnement
//@route GET /api/Abonnement
//@access privet
const GetAbonnemnt = async (req, res) => {
    try {
        const Abonnements = await Abonnement.find()
        if (!Abonnements) {
            return res.status(404).send('no Abonnement found try to create one !')
        }
        res.status(200).json(Abonnements)

    } catch (error) {
        console.log(error.message)
    }
}
//@desc post Abonnement
//@route POST /api/Abonnement
//@access privet
const CreateAbonnemnt = async (req, res) => {
    try {
        const { type, duree, tarif } = req.body
        console.log(req.body)
        if (!type || !duree || !tarif) {
            return res.status(400).send('enter all feald plz !')
        }
        const abonnements = await Abonnement.findOne({ Type: type })
        if (abonnements) {
            return res.status(409).send('Ce Abonnement Existe Déjà malheureusement !')
        }
        const abonnement = await Abonnement.create({
            Type: type.toLowerCase(),
            Duree: duree,
            Tarif: tarif
        })
        res.status(201).json(abonnement)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc get specific Abonnement
//@route GET /api/Abonnement/:id
//@access privet
const GetSpecificAbonnemnt = async (req, res) => {
    try {
        const { id } = req.params
        const abonnement = await Abonnement.findById(id)
        if (!abonnement) {
            return res.status(404).send('no Abonnement found')
        }
        res.status(200).json(abonnement)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc update Abonnement
//@route PATCH /api/Abonnement/:id
//@access privet
const UpdateAbonnemnt = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const abonnement = await Abonnement.findById(id)
        if (!abonnement) {
            return res.status(404).send('no Abonnement found')
        }
        const UpdatedAbonnement = await Abonnement.findByIdAndUpdate(id, data, { new: true })
        // console.log(UpdatedAbonnement)
        res.status(201).json(UpdatedAbonnement)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc delete Abonnement
//@route Delete /api/Abonnement/:id
//@access privet
const DeleteAbonnemnt = async (req, res) => {
    try {
        const { id } = req.params
        const abonnement = await Abonnement.findById(id)
        if (!abonnement) {
            return res.status(404).send('no Abonnement found')
        }
        const deletedAbonnement = await Abonnement.findByIdAndUpdate(id, { del: 1 }, { new: true })
        res.status(200).json(deletedAbonnement)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    GetAbonnemnt,
    CreateAbonnemnt,
    GetSpecificAbonnemnt,
    UpdateAbonnemnt,
    DeleteAbonnemnt
}