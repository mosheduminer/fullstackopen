require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Contact = require('./models/contact')
const ObjectId = require('mongoose').Types.ObjectId


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

morgan.token('post-data', (req) => (
    JSON.stringify(req.body)
))

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :post-data')
)


app.get('/info', (req, res) => {
    Contact.countDocuments().then(response => {
        res.end(`Phonebook has info for ${response.length} people
${Date()}`)
    })
    res.end()
    console.log("/info")
})

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(response => {
        response = response.map(doc => (
            { id: doc._id.toString(), name: doc.name, number: doc.number }
        ))
        res.json(response)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Contact({
        name: body.name,
        number: body.number,
    })
    person.save(response => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findOne(ObjectId(req.params.id)).then(response => {
        if (response) {
            response = { id: response._id.toString(), name: response.name, number: response.number }
            res.json(response)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Contact.updateOne({ _id: ObjectId(req.params.id) }, { ...req.body }).then(() => {
        Contact.findOne(ObjectId(req.params.id)).then(response => {
            res.json({ ...req.body })
        })
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findOneAndDelete(ObjectId(req.params.id)).then(response => {
        res.status(204).end()
    }).catch(error => next(error))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})