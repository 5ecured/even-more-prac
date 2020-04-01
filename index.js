const express = require('express')
const app = express()
const cors = require('cors')

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
    res.send(players)
})

app.delete('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    players = players.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/players', (req, res) => {
    const body = req.body
    body.id = generateId()
    body.important = false
    players = players.concat(body)
    res.send(body)
})

app.put('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    const newBody = {
        id: body.id,
        name: body.name,
        club: body.club,
        important: body.important
    }
    players = players.map(p => p.id === id ? newBody : p)
    res.send(newBody)
})

app.patch('/players/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    const newBody = {...body, important: !body.important}
    players = players.map(p => p.id === id ? newBody : p)
    res.send(newBody)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running on server ${PORT}`)
})