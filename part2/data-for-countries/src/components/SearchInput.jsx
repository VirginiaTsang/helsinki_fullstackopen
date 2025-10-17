const SearchInput = ({searchWord, setSearchWord}) => {
    const handleSearchWordChange = (event) => {
        setSearchWord(event.target.value)
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