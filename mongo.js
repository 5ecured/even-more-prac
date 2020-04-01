const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://cmon:${password}@cluster0-vicxc.mongodb.net/bestdb?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(data => {
        console.log('connected to mongodb!')
    })
    .catch(err => {
        console.log(('error detected', err))
    })

const playerSchema = new mongoose.Schema({
    name: String,
    club: String,
    important: Boolean
})

const Player = mongoose.model('Player', playerSchema)

const player = new Player({
    name: '123',
    club: '456',
    important: false
})

Player.find({}).then(data => {
    console.log(data)
    mongoose.connection.close()
})

// player.save().then(data => {
//     console.log(data)
//     mongoose.connection.close()
// })