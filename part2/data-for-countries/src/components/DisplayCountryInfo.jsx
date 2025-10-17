import CountryService from "../services/CountryService"
import { useState } from "react";

const DisplayCountryInfo = ({name}) => {
    const [country, setCountry] = useState(null)

    if (!country){
        CountryService.getCountry(name).then(res=>{
        setCountry(res)
        }).catch(err => console.error(`Error fetching country ${name}:`, err));
        return <></>;
    }

    return(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital.join(' ')}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt="country flag" />;
        </>
    )
}
export default DisplayCountryInfo