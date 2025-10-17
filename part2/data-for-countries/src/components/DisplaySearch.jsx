import DisplayCountryInfo from "./DisplayCountryInfo";
import DisplayCountryName from "./DisplayCountryName"

const DisplaySearch = ({searchWord, allCountries}) => {
    const matches = allCountries.filter(item => item.includes(searchWord));
    console.log('displaysearch')
    if(matches.length == 1){
        return(
            <DisplayCountryInfo name={matches[0]}/>
        )
    }
    else if (matches.length < 10){
        return(
            <ul>
                {matches.map(country => <DisplayCountryName key={country} name={country}/>)}
            </ul>
        )
    }else{
        return <p>Too many matches, specify another filter</p>
    }
}
export default DisplaySearch