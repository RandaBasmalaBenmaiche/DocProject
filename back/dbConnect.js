const mongoose = require('mongoose')
require('colors')
require('dotenv').config()

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB)
        console.log(`connected to dataBase : ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB