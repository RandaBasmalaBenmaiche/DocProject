const Code = require('../Models/Code')
const User = require('../Models/User')
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require('../.env')
const Mailgen = require('mailgen');
const bcrypt = require('bcryptjs')
require('dotenv').config()

const emailCheck = async (req, res) => {
    try {
        const { email } = req.params
        const mail = await User.findOne({ email: email })
        if (!mail) {
            return res.status(406).send('invalid email')
        }
        // Generate a random number between 0 and 10
        const validateCode = Math.random().toString(36).slice(2).slice(0, 6);
        console.log(validateCode)
        await Code.create({
            codeValid: validateCode,
            uMail: email
        })
        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config)

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Mailgen',
                link: 'https://mailgen.js/'
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        });
        var response = {
            body: {
                name: '',
                intro:` votre code de confirmation: ( ${validateCode} )`,
                acttableion: {
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'confirmer votre action',
                        link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        let maile = mailGenerator.generate(response)

        let message = {
            from: EMAIL,
            to: email,
            subject: 'coonfirmation code',
            html: maile
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({ msg: 'check your email for validation code .' })
        }).catch(error => {
            return res.status(500).json({ error })
        })

    } catch (error) {
        console.log(error.message)
    }
}

const getValidCode = async (req, res) => {
    try {
        const { code } = req.params
        const codes = await Code.findOne({ codeValid: code })
        console.log(codes)
        if (!codes) {
            return res.status(406).send('not a valide Code')
        }
        res.status(200).send('valid')
    } catch (error) {
        console.log(error.message)
    }
}

const EditMe = async (req, res) => {
    try {
        const { email } = req.params
        const data = req.body
        console.log(data)
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(204).send('user not found')
        }
            const salt = await bcrypt.genSalt(process.env.SALT)
            const hashedPassword = await bcrypt.hash(data.password, salt)
            const userUpdated = await User.findOneAndUpdate({email: email}, {password: hashedPassword}, { new: true })
            res.status(201).send('your password changed successfully')
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCode = async (req, res) => {
    try {
        const { email } = req.params
        const code = await Code.find({ uMail: email })
        console.log(code)
        if (!code) {
            return res.status(406).send('not a valide Code')
        }
        code.forEach(async (c) => {
            await Code.findOneAndDelete({ uMail: email })
        })
        res.status(200).send('your pased the trying time')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    emailCheck,
    getValidCode,
    deleteCode,
    EditMe
}