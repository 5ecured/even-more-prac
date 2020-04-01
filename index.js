require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Player = require('./models/players')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let players = [
    { id: 1, name: "Cristiano Ronaldo", club: "Juventus", important: true },
    { id: 2, name: "Lionel Messi", club: "Barcelona", important: false },
    { id: 3, name: "Kaka", club: "AC Milan", important: true },
    { id: 4, name: "Ronaldinho", club: "Barcelona", important: true },
    { id: 5, name: "Deco", club: "Barcelona", important: false }
]

const generateId = () => {
    const maxId = players.length > 0 ? Math.max(...players.map(p => p.id)) : 0
    return maxId + 1
}

app.get('/players', (req, res) => {
    Player.find({})
        .then(data => {
            res.send(data.map(d => d.toJSON()))
        })
})

app.delete('/players/:id', (req, res) => {
    const id = req.params.id
    Player.findByIdAndRemove(id)
        .then(data => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/players', (req, res) => {
    const body = req.body
    body.id = generateId()
    body.important = false

    const newPlayer = new Player({
        name: body.name,
        club: body.club,
        important: false
    })

    newPlayer.save().then(savedPlayer => {
        res.send(savedPlayer.toJSON())
    })
})

app.put('/players/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    const newBody = {
        id: body.id,
        name: body.name,
        club: body.club,
        important: body.important
    }
    Player.findByIdAndUpdate(id, newBody, {new: true})
        .then(data => {
            res.send(data.toJSON())
        })
})

app.patch('/players/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    const newBody = {...body, important: !body.important}
    Player.findByIdAndUpdate(id, newBody, {new: true})
        .then(data => {
            res.send(data.toJSON())
        })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running on server ${PORT}`)
})