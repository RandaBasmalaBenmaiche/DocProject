const Admin = require('../Models/Admin')

const AddAdmin = async (req, res) => {
    try {
        const { add, email, num } = req.body
        if (!add || !email || !num) {
            return res.status(400).send('enter all feald plz !')
        }
        const admin = await Admin.create({
            Aadresse: add,
            Ateleph: num,
            Aemail: email
        })
        res.status(201).json(admin)
    } catch (error) {
        console.log(error.message)
    }
}

const GetAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne()
        if (!admin) {
            res.status(400).send('admin not found')
        }
        res.status(200).json(admin)
    } catch (error) {
        console.log(error.message)
    }
}

const PatchAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(204).send('admin not found')
        }
        const adminUpdated = await Admin.findByIdAndUpdate(id, data, { new: true })
        res.status(201).json(adminUpdated)
    } catch (error) {
        console.log(error.message)
    }
}

const DeleteAdmin = (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    AddAdmin,
    GetAdmin,
    PatchAdmin,
    DeleteAdmin
}