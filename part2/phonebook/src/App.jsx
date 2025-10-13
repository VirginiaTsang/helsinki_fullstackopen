import { useState, useEffect } from 'react'
import DisplayPerson from './components/DisplayPerson'
import AddPersonForm from './components/AddPersonForm'
import SearchPerson from './components/SearchPerson'
import personService from './services/personService'

const App = () => {
  const [allPerson, setAllPerson] = useState([])
  const [personsDisplay, setPersonsDisplay] = useState([])

  useEffect(()=>{
    personService.getAll()
      .then(persons => {
        setAllPerson(persons)
        setPersonsDisplay(persons)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson allPerson={allPerson} setPersonsDisplay={setPersonsDisplay}/>
      <h2>add a new</h2>
      <AddPersonForm allPerson={allPerson} setAllPerson={setAllPerson} setPersonsDisplay={setPersonsDisplay}/>
      <h2>Numbers</h2>
      <DisplayPerson allPerson={allPerson} setAllPerson={setAllPerson} personsDisplay={personsDisplay} setPersonsDisplay={setPersonsDisplay}/>
    </div>
  )
}

export default App