import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}
const getCountry = (country) => {
  const request = axios.get(`${baseUrl}/api/name/${country}`)
  return request.then(response => response.data)
}

const getWeather = (lat,lon) => {
  return axios.get(`${weatherUrl}/?lat=${lat}&lon=${lon}&appid=${api_key}`).then(response => response.data)
}
export default {getAll, getCountry, getWeather}