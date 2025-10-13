import { useState } from 'react'
import personService from '../services/personService'

const AddPersonForm = ({allPerson, setPersonsDisplay, setAllPerson, setMessage}) => {
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

    if(newName === '' || newNumber === ''){
      alert(`You must enter name and number`);
    }
    else{
      const hasName = allPerson.find(element => element.name === newName)
      if(typeof hasName === 'undefined' ){
        personService.create(nameObject).then(res => {
          setPersonsDisplay(allPerson.concat(res))
          setAllPerson(allPerson.concat(res))
          setNewName('')
          setNewNumber('')
          setMessage({
          'text':`Added ${res.name}`,
          'color':'g'
        })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        
      } else{
        if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
          //name is not key
          personService.updatePerson(nameObject, hasName.id).then(res=>{
            setPersonsDisplay(allPerson.map(person=> person.id === hasName.id ? res : person))
            setAllPerson(allPerson.map(person=> person.id === hasName.id ? res : person))
            setNewName('')
            setNewNumber('')
          }).catch(error=>{
            console.log('fail')
            setMessage({
                'text': `Information of ${newName} has been removed from server`,
                'color':'r'
            })
            setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        }
      }
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
