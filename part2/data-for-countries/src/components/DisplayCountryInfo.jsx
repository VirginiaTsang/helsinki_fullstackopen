import CountryService from "../services/CountryService"
import { useState, useEffect} from "react";

const DisplayCountryInfo = ({name}) => {
    const [country, setCountry] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        CountryService.getCountry(name)
            .then(res => {
                setCountry(res);
                return CountryService.getWeather(
                    res.capitalInfo.latlng[0],
                    res.capitalInfo.latlng[1]
                );
            })
            .then(weatherData => {
                setWeather(weatherData)
            })
            .catch(err => console.error(`Error fetching data for ${name}:`, err))
    }, [name]);
    if (!country || !weather) return <p>Loading...</p>;
    
    return(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital.join(' ')}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt="country flag" />  
            <h2>Weather in {country.capital}</h2>
            <p>Temperatrue {(weather.main.temp-273.15).toPrecision(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Wind {weather.wind.speed} m/s</p>
            
        </>
    )
}
export default DisplayCountryInfo