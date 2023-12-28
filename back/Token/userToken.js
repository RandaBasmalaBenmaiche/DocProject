const jwt = require('jsonwebtoken')
require('dotenv').config

// generate JWT
const generateToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '15d'})
}

module.exports = generateToken