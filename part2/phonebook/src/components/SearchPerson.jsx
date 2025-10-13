const SearchPerson = ({allPerson, setPersonsDisplay}) => {
    const handleSearch = (event) => { 
        setPersonsDisplay(allPerson.filter(allPerson => allPerson.name.startsWith(event.target.value)))
    }
    return(
        <div>filter shown with <input onChange={handleSearch}/></div>
    )
}

export default SearchPerson