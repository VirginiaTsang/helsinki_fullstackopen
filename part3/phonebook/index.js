const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId =() => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) : 0
    return String(maxId+1)
}
app.get('/api/persons',(req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
    const person = persons.find(person=>person.id===req.params.id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.get('/info',(req, res) => {
    let date_time=new Date()
    res.send(`Phonebook has info for ${persons.length} people <br/> ${date_time}`)
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(persons.find(person => person.name === body.name)){
        return res.status(400).json({
            'error':'name must be unique'
        })
        
    } else if (body.name == ""){
        return res.status(400).json({
            'error':'name cannot be empty'
        })}
    else if (body.number == ""){
        return res.status(400).json({
            'error':'number cannot be empty'
        })
    
    }

    const person = {
        id:generateId(),
        name: body.name,
        number: body.number
    }
    persons=persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id',(req,res) => {
    persons=persons.filter(person=>person.id!==req.params.id)
    res.status(204).end()
})

app.put('/api/persons/:id',(req,res) => {
    const req_id = req.params.id
    const body = req.body
    const newPerson = {
        id: req_id,
        name: body.name,
        number: body.number
    }
    const i = persons.findIndex(p => p.id === req_id)
    persons[i] = newPerson
        console.log(persons)
        res.json(newPerson)
    })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
