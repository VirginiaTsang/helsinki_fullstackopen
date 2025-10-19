require('dotenv').config()
const express = require('express')
const morgan = require('morgan') //logger
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


morgan.token('post_body', function getId (req) {
  return req.body? JSON.stringify(req.body) : ""
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['post_body'](req,res)
  ].join(' ')
}))

app.get('/api/persons',(req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/persons/:id',(req,res) => {
    Person.findById(req.params.id)
    .then(person => {
            res.json(person)})
    .catch(err => {
        res.status(400).json({'error':err})
    })
})

app.get('/info',(req, res) => {
    let date_time=new Date()
    Person.find({}).then(result => {
    res.send(`Phonebook has info for ${result.length} people <br/> ${date_time}`)
    })
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    if (body.name === ""){
        return res.status(400).json({
            'error':'name cannot be empty'
        })}
    else if (body.number === ""){
        return res.status(400).json({
            'error':'number cannot be empty'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.delete('/api/persons/:id',(req,res) => {
    Person.deleteOne({ name: req.params.id }).then(()=>{
        res.status(204).end()
    })
})

app.put('/api/persons/:id',(req,res) => {
    const req_id = req.params.id
    const body = req.body
    Person.updateOne({_id:req_id}, {number: body.number}).then(updatedPerson =>res.json(updatedPerson))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
