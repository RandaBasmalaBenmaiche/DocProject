const Sujet = require('../Models/Sujet')
const Modules = require('../Models/Modules')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');
// @desc getting all sujet
// @route GET /api/sujet/
// @access  Privet
const GetSujets = async (req, res) => {
    try {
        const sujet = await Sujet.find({del:0})
        if (sujet.length === 0) {
            return res.status(204).send('no sujet')
        }
        res.status(200).json(sujet)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc getting sujet
// @route GET /api/sujet/:id
// @access  Privet
const GetSpecificSujets = async (req, res) => {
    try {
        const { id } = req.params
        const sujet = await Sujet.findById(id)
        if (!sujet) {
            return res.status(400).send('no sujet found')
        }
        res.status(200).json(sujet)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc getting sujet
// @route GET /api/sujet/sujetmodul/:id
// @access  Privet
const GetSpecificSujetsModule = async (req, res) => {
    try {
        const { id } = req.params
        const sujet = await Sujet.find({ module: id })
        if (!sujet) {
            return res.status(400).send('no sujet found')
        }
        res.status(200).json(sujet)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc getting sujet by module id
// @route GET /api/sujet/sujetmedule/:id
// @access  Privet
const GetSujetsModule = async (req, res) => {
    try {
        const {
            id,
            titre,
            anneeStart,
            anneeEnd,
            coure,
            type,
            source
        } = req.params
        console.log(type)
        if (id && titre && anneeStart && anneeEnd && coure && type && source) {
            const sujett = await Sujet.find({
                module: id,
                coure: { $in: coure.split(',') },
                date: { $gte: anneeStart, $lte: anneeEnd },
                source: { $in: source.split(',') } // source here is an array of typs.
            }
            )
            if (sujett.length === 0) {
                return res.status(409).send('no sujet found, try to change type or annee or source of your data')
            }
            const modules = await Modules.findById(id)
            console.log('sujett')
            console.log(sujett)
            const sujet = sujett.filter(suj => suj.del === 0)
            console.log('filtred sujet')
            console.log(sujet)
            let FiltredQuestion = [];
            // const FiltredQuestion = sujet.forEach(sj =>{
            //     // return sj.question.filter(item => type.split(',').includes(item.sujetType))
            //     console.log('sj.question');
            //     console.log(sj.question);
            // })
            for(let i=0;i<sujet.length;i++){
                const qs = sujet[i].question;
                for(let i=0;i<qs.length;i++){
                    if(type.includes(qs[i].sujetType)){
                        FiltredQuestion.push(qs[i]);
                    }
                    
                }
            }
            
            
            // console.log('FiltredQuestion')
            // console.log(FiltredQuestion) 
            let today = new Date()
            let dateString = today.toLocaleDateString('en-GB')
            res.status(200).json({
                user: req.user.id,
                titre: titre,
                sujetType: type,
                date: dateString,
                annee: [anneeStart, anneeEnd],
                source: source,
                module: modules.name,
                anneeScol: modules.annee,
                questions: FiltredQuestion.map(qes => ({
                    id: qes._id,
                    type: qes.sujetType,
                    qs: {
                        question: qes.question,
                        reponse: qes.reponse,
                        corect: qes.reponse.filter(answer => answer.isCorrect).map(answer => ({ id: answer._id })),
                        chek: [],
                        corection: 'null',
                        time: null
                    }
                }))
            })
        } else {
            return res.status(400).send('complete all steps first')
        }
    } catch (error) {
        console.log(error.message)
    }
}

// @desc creating sujet
// @route POST /api/sujet/
// @access  Privet
const CreateSujets = async (req, res) => {
    try {
        const { name, date, source, annee, module, coure } = req.body
        console.log(req.body)
        if (!name || !date || !source || !annee || !module || !coure) {
            return res.status(400).send('enter all fealdes please')
        }
        const sujets = await Sujet.findOne({ name: name })
        if (sujets) {
            return res.status(409).send('Ce Sujet Existe Déjà malheureusement !')
        }
        const sujet = await Sujet.create({
            name: name,
            annee: annee,
            date: date,
            source: source,
            module: module,
            coure: coure
        })
        res.status(201).send(sujet._id)
    } catch (error) {
        console.log(error.message)
    }
}

// @desc edit sujet
// @route PATCH /api/sujet/:id
// @access  Privet
const EditSujets = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body
        console.log('newData')
        console.log(newData[0])
        const sujet = await Sujet.findById(id)
        if (!sujet) {
            return res.status(400).send('Sujet not found')
        }
        const sujetUpdated = await Sujet.findOneAndUpdate(
            { _id: id },
            { $push: { question: newData[0] } }
        )
        res.status(201).json(sujetUpdated)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc edit sujet
// @route PATCH /api/sujet/updateQuest/:id
// @access  Privet
const EditquestionSujets = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const newData = req.body
        console.log('newData')
        console.log(newData)
        const sujet = await Sujet.findOne({ "question._id": ObjectId(id) })
        if (!sujet) {
            return res.status(400).send('Sujet not found')
        }
        const parsedReponse = JSON.parse(newData.reponse);
        newData.reponse = parsedReponse;
        const questionIndex = sujet.question.findIndex(q => q._id == id);
        // const upp = sujet.question.map(suj => suj._id == id)
        // console.log(upp)
        const sujetUpdated = await Sujet.findOneAndUpdate(
            { "question._id": ObjectId(id) },
            { $set: { [`question.${questionIndex}`]: newData } },
            { new: true }
        )
        console.log(sujetUpdated)
        res.status(201).json(sujetUpdated)
    } catch (error) {
        console.log(error.message)
    }
}
// @desc edit sujet
// @route PATCH /api/sujet/update/:id
// @access  Privet
const updateSujets = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const data = req.body
        console.log(data)
        const sujet = await Sujet.findById(id)
        if (!sujet) {
            return res.status(400).send('Sujet not found')
        }
        const sujetUpdated = await Sujet.findByIdAndUpdate(id, data, { new: true })
        console.log(sujetUpdated)
        res.status(201).json(sujetUpdated)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

// @desc delete sujet
// @route DELETE /api/sujet/:id
// @access  Privet
const DeleteSujets = async (req, res) => {
    try {
        const { id } = req.params
        const sujet = await Sujet.findById(id)
        if (!sujet) {
            return res.status(400).send('Sujet not found')
        }
        const sujetDeleted = await Sujet.findByIdAndUpdate(id, { del: 1 }, { new: true })
        res.status(201).json(sujetDeleted)
    } catch (error) {
        console.log(error.message)
    }
}

const DeleteQest = async (req, res) => {
    try {
        const { id, qsId,position } = req.params
        const sujet = await Sujet.findById(id)
        if (!sujet) {
            return res.status(400).send('Sujet not found')
        }
        // const sujett = await Sujet.findOne({ "question._id": ObjectId(qsId) })
        // console.log(sujett.question[0].del);

        const zero =position;
        const sujetDeleted = await Sujet.findOneAndUpdate(
            { "question._id": ObjectId(qsId) },
            { [`question.${zero}.del`]: 1 },
            { new: true }
        )
        console.log(sujetDeleted)
        

        res.status(201).json(sujetDeleted)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    GetSujets,
    GetSpecificSujets,
    GetSpecificSujetsModule,
    GetSujetsModule,
    CreateSujets,
    EditSujets,
    DeleteSujets,
    updateSujets,
    EditquestionSujets,
    DeleteQest
}