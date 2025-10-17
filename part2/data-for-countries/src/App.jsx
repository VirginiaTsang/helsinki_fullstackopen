import { useState, useEffect } from 'react'
import SearchInput from './components/SearchInput'
import DisplaySearch from './components/DisplaySearch'
import CountryServices from './services/CountryService'

const App = (props) => {
  const [searchWord, setSearchWord] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [userShow, setUserShow] = useState({show:false, country:null})

  useEffect(()=>{
    CountryServices.getAll().then(response=>{
      setAllCountries(response.map(res => res.name.common))
    }).catch(err => console.error('Error fetching countries:', err));
  },[])
  
  return (
    <> 
      <SearchInput searchWord={searchWord} setSearchWord={setSearchWord} userShow={userShow} setUserShow={setUserShow}/>
      <DisplaySearch searchWord={searchWord} allCountries={allCountries} userShow={userShow} setUserShow={setUserShow}/>
    </>
  )
}

export default App 