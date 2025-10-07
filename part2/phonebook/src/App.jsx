import { useState } from 'react'
import DisplayPerson from './components/DisplayPerson'
import AddPersonForm from './components/AddPersonForm'
import SearchPerson from './components/SearchPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsDisplay, setPersonsDisplay] = useState([])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson persons={persons} setPersonsDisplay={setPersonsDisplay}/>
      <h2>add a new</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} setPersonsDisplay={setPersonsDisplay}/>
      <h2>Numbers</h2>
      <DisplayPerson persons={personsDisplay}/>
    </div>
  )
}

export default App