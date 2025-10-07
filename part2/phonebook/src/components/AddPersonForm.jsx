import { useState } from 'react'

const AddPersonForm = ({persons, setPersons,setPersonsDisplay}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //action when submit button clicked
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const hasName = persons.find(element => element.name === newName)
    if(typeof hasName === 'undefined'){
      setPersons(persons.concat(nameObject))
      setPersonsDisplay(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else{
      alert(`${newName} is already added to phonebook`);
    }
  }

  return(
    <>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
export default AddPersonForm

