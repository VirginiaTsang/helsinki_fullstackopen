const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res, next) => {
  Person.find({}).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.get('/info', (req, res, next) => {
  let date_time = new Date()
  Person.find({}).then(result => {
    res.send(`Phonebook has info for ${result.length} people <br/> ${date_time}`)
  })
    .catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(person => {
    console.log(person)
    res.status(204).end()
  })
    .catch(error => next(error))
})

personsRouter.put('/api/persons/:id', (req, res, next) => {
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

module.exports = personsRouter