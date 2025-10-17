import { useState } from "react";
import DisplayCountryInfo from "./DisplayCountryInfo";
import DisplayCountryName from "./DisplayCountryName"

const DisplaySearch = ({searchWord, allCountries, userShow, setUserShow}) => {
    const matches = allCountries.filter(item => item.includes(searchWord));
    console.log('displaysearch')
    if(matches.length == 1 || userShow.show === true){
        const displayCountry = userShow.show? userShow.country : matches[0]
        return(
            <DisplayCountryInfo name={displayCountry}/>
        )
    }
    else if (matches.length < 10 && matches.length > 1){
        return(
            <ul>
                {matches.map(country => <DisplayCountryName key={country} name={country} userShow={userShow} setUserShow={setUserShow}/>)}
            </ul>
        )
    }else{
        return <p>Too many matches, specify another filter</p>
    }
}
export default DisplaySearch