const SearchInput = ({searchWord, setSearchWord, setUserShow}) => {
    const handleSearchWordChange = (event) => {
        setSearchWord(event.target.value)
        setUserShow({show:false, country:null})
    }

    const formContainer = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    }

    return (
        <>
            <form style={formContainer}>
            <p>find countries</p>
            <input value={searchWord} onChange={handleSearchWordChange} />
            </form>
        </>
    )
}

export default SearchInput