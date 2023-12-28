const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../Token/userToken')
const Abonnement = require('../Models/Abonnement')
const moment = require('moment');
require('dotenv').config()
// @desc regester user 
// @route POST /api/user/regester
// @access public
const regesterUser = async (req, res) => {
    try {
        // geting data from the user
        const {  userName, annee, wilaya, email, password, gold } = await req.body
        if ( !userName  || !email || !wilaya || !password || !gold) {
            return res.status(400).send('enter all feald plz !')
        }
        const userEmail = await User.findOne({ email: email})
        if (userEmail) {
            return res.status(409).send('email already exist !')
        }
        // const startdate = new Date();
        // const option = { day:'2-digit', month:'2-digit', year:'numeric'};
        const startdate = moment().format();
        // haching the password
        const salt = await bcrypt.genSalt(process.env.SALT)
        const hashedPassword = await bcrypt.hash(password, salt)
        // creating the user
        console.log('startdate')
        console.log(startdate)
        const user = await User.create({
            userName : userName,
            annee: annee ? annee : '',
            wilaya: wilaya.toLowerCase(),
            Debut: startdate,
            email: email,
            password: hashedPassword,
            gold: gold.toLowerCase()
        })
        // sending the response
        res.status(201).json({ token: generateToken(user._id), gold: user.gold, isAdmin: user.isAdmin })
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}
// @desc loginUser user 
// @route POST /api/user/login
// @access public
const loginUser = async (req, res) => {
    try {
        // extacting the data from the req
        const { email, password } = await req.body
        // geting the user from the bd
        const user = await User.findOne({ email })
        // checking if the user exist
        if (!user) {
            return res.status(404).send('there is no user with those cordinate -email- !!')
        }
        if (user.isConnect){
            return res.status(404).send('you can not connect now try another time :) !!')
        }
        // checking the password
        if (await bcrypt.compare(password, user.password)) {
            // res.status(200).json(user)
            await User.findOneAndUpdate({ email:  email}, {isConnect: true}, {new: true})
            res.status(200).json([{ token: generateToken(user._id)},{type: user.isAdmin ? 'admin' : user.gold}])
        } else {
            return res.status(400).send('mot de passe ou email incorecte !')
        }
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

// @desc user  Data
// @route GET /api/user/
// @access public
const getUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

// @desc Createt User 
// @route POST /api/user/
// @access Privet
const CreatetUser = async (req, res) => {
    try {
        const { lastName, firstName, userName, annee, adresse, telephone, email, password, gold } = req.body
        if (!lastName || !firstName || !userName || !adresse || !telephone || !annee || !email || !password || !gold) {
            return res.status(400).send('enter all feald plz !')
        }
        const userEmail = await User.findOne({ email: email, userName: userName })
        if (userEmail) {
            return res.status(409).send('email already exist !')
        }
        const username = await User.findOne({ userName: userName })
        if (username) {
            return res.status(409).send('userName already exist !')
        }
        // const type = ""
        // if(gold === "gold"){
        //     type = "gold"
        // }else if (gold === "normal"){
        //     type = "normal"
        // }else if (gold === "test"){
        //     type = "test"
        // }
        // const abonnement = await Abonnement.findOne({ Type: type })
        // const duration = abonnement.Duree // duration in days
        // const startDate = new Date() // start date is today
        // const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000) // end date is start date + duration in milliseconds
        // const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        // console.log('Start date:', startDate.toLocaleDateString())
        // console.log('End date:', endDate.toLocaleDateString())

        // const salt = await bcrypt.genSalt(process.env.SALT)
        // const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            lastName: lastName,
            firstName: firstName,
            userName: userName,
            annee: annee,
            email: email,
            adresse: adresse,
            telephone: telephone,
            password: password,
            // gold: gold.toLowerCase(),
            // Debut: startDate.toLocaleDateString('en-GB', options),
            // Fin: endDate.toLocaleDateString('en-GB', options)
        })
        res.status(201).json(user)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc specific user Data
// @route GET /api/user/profile
// @access privet
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            console.log('no user found')
            res.status(400).send('user not found')
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

// @desc get UserAnneeAbonnement
// @route GET /api/user/:id
// @access Privet
const GetUserAnneeAbonnement = async (req, res) => {
    try {
        const { Abonnement, annee } = req.params
        if (annee === "undefined" && Abonnement !== "undefined") {
            const user = await User.find({ gold: Abonnement })
            if (!user) {
                return res.status(404).send('user not found !')
            }
            return res.status(200).json(user)
        }
        else if (Abonnement === "undefined" && annee !== "undefined") {
            const user = await User.find({ annee: annee })
            if (!user) {
                return res.status(404).send('user not found !')
            }
            return res.status(200).json(user)
        }
        else if (Abonnement !== "undefined" && annee !== "undefined") {
            const user = await User.find({ gold: Abonnement, annee: annee })
            if (!user) {
                return res.status(404).send('user not found !')
            }
            return res.status(200).json(user)
        } else if (Abonnement === "undefined" && annee === "undefined") {
            const user = await User.find()
            if (!user) {
                return res.status(404).send('user not found !')
            }
            return res.status(200).json(user)
        }
    } catch (error) {
        console.log(error.message)
    }
}

// @desc edit user
// @route PATCH /api/user/:id
// @access Privet
const EditUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        let update = { ...data }
        console.log(update)
        const user = await User.findById(id)
        if (!user) {
            return res.status(204).send('user not found')
        }
        if (user.gold !== update) {
            const abonnement = await Abonnement.findOne({ Type: update.gold })
            const duration = abonnement.Duree // duration in days
            const startDate = new Date() // start date is today
            const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000) // end date is start date + duration in milliseconds
            update = {
                ...update,
                Type: update.gold,
                Debut: startDate.toLocaleDateString(),
                Fin: endDate.toLocaleDateString()
            }
        }
        const userUpdated = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(201).json(userUpdated)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc Delet user
// @route DELET /api/user/:id
// @access public
const deletUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(204).send('user not found')
        }
        const users = await User.findByIdAndUpdate(req.params.id, { del: 1 }, { new: true })
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        console.log(user)
        if (!user) {
            return res.status(204).send('user not found')
        }
        const userUpdated = await User.findByIdAndUpdate(req.user, {isConnect: false}, { new: true })
        console.log('logOut')
        console.log(userUpdated)
        res.status(201).json(userUpdated)
    } catch (error) {
        console.log(error.message)
    }
}

const EditMe = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        console.log('data')
        console.log(data)
        const user = await User.findById(id)
        if (!user) {
            return res.status(204).send('user not found')
        }
        console.log(user.password)
        if (user.password != data.password) {
            // haching the password
            const salt = await bcrypt.genSalt(process.env.SALT)
            const hashedPassword = await bcrypt.hash(data.password, salt)
            const update = {
                ...data,
                password : hashedPassword,
            }
            const userUpdated = await User.findByIdAndUpdate(id, update, { new: true })
            res.status(201).json(userUpdated)
        } else {
            const userUpdated = await User.findByIdAndUpdate(id, data, { new: true })
            res.status(201).json(userUpdated)
        }
    } catch (error) {
        console.log(error.message)
    }
}

const checkUserAb = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(400).send('no user found')
        }
        if(user.Fin == null){
            const date1 = moment(user.Debut);
            const date2 = moment();
            const diffInDays = date2.diff(date1, 'days');
            console.log('days')
            console.log(date2)
            console.log('diffInDays 7 days')
            console.log(diffInDays)
            if(diffInDays > 7 && user.isAdmin !== true){
                return res.status(200).json({abb : 'test'})
            }
        }else{
            const date1 = moment(user.Fin);
            const date2 = moment();
            const diffInDays = date2.diff(date1, 'days');
            console.log('diffInDays abn')
            console.log(diffInDays)
            if(diffInDays < 0  && user.isAdmin !== true){
                return res.status(200).json({abb : 'abn'})
            }
        }
        return res.status(200).json({abb : 'ok'})
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    regesterUser,
    loginUser,
    CreatetUser,
    GetUserAnneeAbonnement,
    getUser,
    deletUser,
    getMe,
    EditUser,
    logout,
    EditMe,
    checkUserAb
}