import Person from "./Person";
import PersonService from "../services/personService";

const DisplayPerson = ({personsDisplay, setPersonsDisplay, allPerson, setAllPerson, setMessage}) => {
    const deleteAction = (name,id) => {
        if (window.confirm(`Delete ${name}?`)) {
        PersonService.deletePerson(id).then(res => {
            setPersonsDisplay(personsDisplay.filter(person => person.id !== res.id))
            setAllPerson(allPerson.filter(person => person.id !== res.id))

            }
        ).catch(error=>{
            console.log('fail')
            setMessage({
                'text': `Information of ${name} has been removed from server`,
                'color':'r'
            })
            setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        }
    }
    
    return(<>{personsDisplay.map(person => <Person key={person.name} name={person.name} number={person.number} deleteAction={()=>deleteAction(person.name, person.id)}/>)}</>)
}

export default DisplayPerson