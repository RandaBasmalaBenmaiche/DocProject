const visit = require('../Models/visit')

const addVisit = async (req, res) => {
    try {
        const { visite } = req.body
        if (!visite) {
            return res.status(400).send('nothing sent !')
        }
        let today = new Date()
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        let dateString = today.toLocaleDateString('en-GB', options)
        const visited = await visit.create({
            visit: visite,
            date: dateString
        })
        res.status(201).json(visited)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addVisit
}