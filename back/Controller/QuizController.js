const Quiz = require('../Models/Quiz')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
//@desc create quiz
//@route POST /api/quiz
//@access privet
const AddQuiz = async (req, res) => {
    try {
        const { user, titre, sujetType, date, annee, source, questions, module, anneeScol } = req.body
        console.log('req.body :')
        console.log(req.body)
        if (!user || titre == 'null' || !sujetType || !date || !annee || !source || !questions || !module || !anneeScol) {
            return res.status(400).send('it is look like there is missing data')
        }
        const Users = await User.findById(user)
        if (!Users) {
            return res.status(404).send('there is problem can not find you !')
        }
        const quiz = await Quiz.create({
            titre: titre,
            type: sujetType,
            date: date,
            annee: annee,
            source: source,
            module: module,
            anneeScol: anneeScol,
            questions: questions,
            user: user
        })
        console.log('quiz :')
        console.log(quiz)
        res.status(201).json(quiz)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc get quiz 
//@route POST /api/quiz/
//@access privet
const GetQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.find()
        if (!quiz) {
            return res.status(404).send('quiz not fond !')
        }
        res.status(200).json(quiz)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc get quiz by id
//@route POST /api/quiz/:id
//@access privet
const ByIdGetQuiz = async (req, res) => {
    try {
        const { id } = req.params
        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(404).send('quiz not fond !')
        }
        console.log(quiz)
        res.status(200).json(quiz)
    } catch (error) {
        console.log(error.message)
    }
}
//@desc get quiz by id
//@route POST /api/quiz/userquiz
//@access privet
const GetQuizById = async (req, res) => {
    try {
        token = req.headers.authorization.split(' ')[1]
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.id)
        const quiz = await Quiz.find({ user: decoded.id })
        if (!quiz) {
            return res.status(404).send('quiz not fond !')
        }
        console.log(quiz)
        res.status(200).json(quiz)
    } catch (error) {
        console.log(error.message)
    }
}

//@desc update quiz
//@route PATCH /api/quiz/:id
//@access privet
const UpdateQuiz = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        console.log('data');
        console.log(data);
        const tritedData = data.map(data => ({ id: data.id, chek: data.chek, corection: data.correction[0], time: data.time[0] }))
        console.log("tritedData :")
        console.log(tritedData)
        tritedData.map(el => console.log(el.id))
        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(404).send('no quiz found !')
        }
        // const quizz = await Quiz.findOne({ "questions.id": { $in: tritedData.map(el => el.id) } });
        // console.log(quiz)
        const _ids = quiz.questions.map(quiz => quiz._id)
        console.log('_ids')
        console.log(_ids)
        let updatedquiz = []
        for (const id of _ids) {
            for (const element of tritedData) {
                let chek = [];
               
                for(let i=0;i<element.chek.length;i++){
                    const valuechek = element.chek[i].idProp;
                    chek.push({id:valuechek})
                }
               
                // console.log('valuechek');
                // console.log(valuechek);
                // console.log('chek');
                // console.log(chek);
                
                const quiz = await Quiz.findOneAndUpdate(
                    { "questions._id": id, "questions.qs.id": element.id },
                    {
                        $set: {
                            "questions.$[elem].qs.corection": element.corection.type,
                            "questions.$[elem].qs.chek": chek,
                            "questions.$[elem].qs.time": element.time.tim,
                        },
                    },
                    {
                        arrayFilters: [{ "elem.id": element.id }],
                        new: true,
                    }
                );
                updatedquiz.push(quiz);
            }
        }
        
        console.log('update :')
        // console.log(updatedquiz[0].questions);
        console.log(updatedquiz.questions[0].qs)
        res.status(200).json(updatedquiz)
    } catch (error) {
        console.log('error.message : ')
        console.log(error.message)
        res.send(error.message)
    }
}

//@desc delete quiz
//@route DELETE /api/quiz/:id
//@access privet
const DeleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
        if (!quiz) {
            return res.status(404).send('quiz not found')
        }
        const deletedquiz = await Quiz.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedquiz)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

module.exports = {
    AddQuiz,
    GetQuizById,
    UpdateQuiz,
    GetQuiz,
    ByIdGetQuiz,
    DeleteQuiz
}