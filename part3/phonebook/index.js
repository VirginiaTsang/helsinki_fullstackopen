const express = require('express')
const app = express()
app.use(express.json())

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
    console.log(body)
    if(persons.find(person => person.name === body.name)){
        console.log("hi")
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
        name: body.name,
        number: body.number,
        id:generateId()
    }
    persons=persons.concat(person)
    console.log(persons)
    res.json(person)
})

app.delete('/api/persons/:id', (res,req) => {
    persons=persons.filter(person=>person.id!==req.params.id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
