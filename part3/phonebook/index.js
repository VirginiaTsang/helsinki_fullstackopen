require('dotenv').config()
const express = require('express')
const morgan = require('morgan') //logger
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


morgan.token('post_body', function getId(req) {
  return req.body ? JSON.stringify(req.body) : ''
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['post_body'](req, res)
  ].join(' ')
}))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  let date_time = new Date()
  Person.find({}).then(result => {
    res.send(`Phonebook has info for ${result.length} people <br/> ${date_time}`)
  })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (body.name === '') {
    return res.status(400).json({
      'error': 'name cannot be empty'
    })
  }
  else if (body.number === '') {
    return res.status(400).json({
      'error': 'number cannot be empty'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(person => {
    console.log(person)
    res.status(204).end()
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const req_id = req.params.id
  const body = req.body
  Person.updateOne({ _id: req_id }, { number: body.number }, { runValidators: true }).then(updatedPerson => {
    if (updatedPerson.modifiedCount === 1) {
      res.json({ ...req.body, id: req.params.id })
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)