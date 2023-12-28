const History = require('../Models/History')
const jwt = require('jsonwebtoken')


const userHistory = async (req, res) => {
    try {
        const { module, video, cours, audio, user } = req.body
        console.log('body data')
        console.log(module)
        console.log(cours)
        console.log(audio)
        // verify the token
        const decoded = jwt.verify(user, process.env.JWT_SECRET)
        console.log(decoded.id)
        // check if user history allready exist
        const userHistory = await History.find({ user: decoded.id })
        if (userHistory[0] != null) {
            const history = userHistory[0]
            console.log('existing history :')
            console.log(history)
            console.log('-------------------')
            if (module != null) {
                console.log('module is not null');
                console.log('before push, history.module:', history.module);
                history.module.push(...module);
                console.log('after push, history.module:', history.module);
            }
            if (cours != null) {
                console.log('cours is not null');
                console.log('before push, history.cours:', history.cours);
                history.cours.push(...cours);
                console.log('after push, history.cours:', history.cours);
            }
            if (video != null) {
                console.log('video is not null');
                console.log('before push, history.video:', history.video);
                history.video.push(...video);
                console.log('after push, history.video:', history.video);
            }
            if (audio != null) {
                console.log('audio is not null');
                console.log('before push, history.audio:', history.audio);
                history.audio.push(...audio);
                console.log('after push, history.audio:', history.audio);
            }
            console.log('--------------------')
            console.log('history :')
            console.log(history)
            const historyUpdated = await History.findOneAndUpdate({ user: decoded.id }, history)
            return res.status(200).json(historyUpdated)
        } else {
            const history = await History.create({
                module: module !== null ? module : [],
                cours: cours !== null ? cours : [],
                video: video !== null ? video : [],
                audio: audio !== null ? audio : [],
                user: decoded.id
            })
            res.status(201).json(history)
        }
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

const getUserHistory = async (req, res) => {
    try {
        // check if user history allready exist
        const userHistory = await History.find({ user: req.user.id })
        if (userHistory[0] === null) {
            return res.status(204).send('history empty')
        }
        res.status(200).json(userHistory)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}
const deletecourHistory = async (req, res) => {
    try {
        const hist = await History.find({ user: req.user.id })
        if (!hist) {
            return res.status(409).send('nothing found !!')
        }
        const cours = hist[0].cours.filter(h => h._id != req.params.id)
        const deletedcour = await History.findOneAndUpdate({user: req.user.id},{cours : cours}, {new: true})
        res.status(200).json(deletedcour)
    } catch (error) {
        console.log(error.message)
    }
}
const deletevideoHistory = async (req, res) => {
    try {
        const hist = await History.find({ user: req.user.id })
        if (!hist) {
            return res.status(409).send('nothing found !!')
        }
        const video = hist[0].video.filter(h => h._id != req.params.id)
        const deletedvideo = await History.findOneAndUpdate({user: req.user.id},{video : video}, {new: true})
        res.status(200).json(deletedvideo)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    userHistory,
    getUserHistory,
    deletecourHistory,
    deletevideoHistory
}