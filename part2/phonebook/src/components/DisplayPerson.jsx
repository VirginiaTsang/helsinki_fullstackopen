import Person from "./Person";
import PersonService from "../services/personService";

const DisplayPerson = ({personsDisplay, setPersonsDisplay, allPerson, setAllPerson}) => {
    const deleteAction = (name,id) => {
        if (window.confirm(`Delete ${name}?`)) {
        PersonService.deletePerson(id).then(res => {
            setPersonsDisplay(personsDisplay.filter(person => person.id !== res.id))
            setAllPerson(allPerson.filter(person => person.id !== res.id))

            }
        )
    }
    }
    
    return(<>{personsDisplay.map(person => <Person key={person.name} name={person.name} number={person.number} deleteAction={()=>deleteAction(person.name, person.id)}/>)}</>)
}

export default DisplayPerson