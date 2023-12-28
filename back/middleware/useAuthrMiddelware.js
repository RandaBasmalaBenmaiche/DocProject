const jwt = require('jsonwebtoken')
const User = require('../Models/User')
require('dotenv').config()

const protect = async (req , res , next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from the token
            req.user = await User.findById(decoded.id).select(-'password')
            
            next()
        } catch (error) {
            console.log(error.message)
        }
    }
    if(!token){
        res.status(401).send('not authorized')
    }
}
const protectAdmin = async (req , res , next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from the token
            //req.user : in this case we dont need to find by id for the user
            const user = await User.findById(decoded.id).select(-'password')
            if(!user || !user.isAdmin){
                return res.status(401).send('not authorized for this action')
            }
            next()
        } catch (error) {
            console.log("from auth middleware")
            console.log(error.message)
        }
    }
    if(!token){
        res.status(401).send('not authorized')
    }
}

module.exports = {protect,protectAdmin}