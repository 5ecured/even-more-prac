const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(data => {
        console.log('connected to mongodb!')
    })
    .catch(err => {
        console.log(('error detected', err))
    })

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    club: {
        type: String,
        minlength: 2,
        required: true
    },
    important: Boolean
})

playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})





module.exports = mongoose.model('Player', playerSchema)