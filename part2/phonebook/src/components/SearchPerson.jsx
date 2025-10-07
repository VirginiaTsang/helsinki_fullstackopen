const SearchPerson = ({persons, setPersonsDisplay}) => {
    const handleSearch = (event) => { 
        setPersonsDisplay(persons.filter(person => person.name.startsWith(event.target.value)))
    }
    return(
        <div>filter shown with <input onChange={handleSearch}/></div>
    )
}

export default SearchPerson