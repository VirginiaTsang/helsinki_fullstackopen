import { useState, useEffect } from 'react'
import DisplayPerson from './components/DisplayPerson'
import AddPersonForm from './components/AddPersonForm'
import SearchPerson from './components/SearchPerson'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsDisplay, setPersonsDisplay] = useState([])

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

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