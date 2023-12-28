// import
const express = require("express")
const App = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()
require('colors')

// Routes import
const User = require('./Routes/userRoutes')
const Module = require('./Routes/moduleRoutes')
const Sujet = require('./Routes/sujetRoutes')
const Coure = require('./Routes/coureRoutes')
const History = require('./Routes/historyRoutes')
const Quiz = require('./Routes/quizRoutes')
const Annee = require('./Routes/anneeRoutes')
const Abonnement = require('./Routes/abonnementRoutes')
const Stat = require('./Routes/statRoutes')
const Visit = require('./Routes/visitRoutes')
const Admin = require('./Routes/adminRoutes')
const Code = require('./Routes/codeRoutes')
//import data base connection function
const connectDB = require("./dbConnect")

// Connect to database
connectDB()

// midelware
App.use(cors())
App.use('/uploads', express.static('uploads'));
// Set up CORS headers
// App.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your own domain
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
App.use(express.json())
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())
App.use(helmet())
if ('env' === 'development') {
    App.use(morgan('tiny'))
}

// Routes
App.use('/api/user', User)
App.use('/api/module', Module)
App.use('/api/sujet', Sujet)
App.use('/api/coure', Coure)
App.use('/api/history', History)
App.use('/api/quiz', Quiz)
App.use('/api/annee', Annee)
App.use('/api/abonnement', Abonnement)
App.use('/api/stat', Stat)
App.use('/api/visit', Visit)
App.use('/api/admin', Admin)
App.use('/api/code', Code)

// server connection
const PORT = process.env.PORT || 8000
App.listen(PORT, () => { console.log(`app run on ${PORT} PORT`.cyan.underline) })