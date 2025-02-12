import { useEffect, useState } from 'react'
import axios from 'axios'

const AllWeather = ({ result }) => {
    const [allWeather, setAllWeather] = useState(null)

    useEffect(() => {
        // Directly using the API key in the request (not recommended for production)
        const api_key = "3aeaafe7961e4d344160004b8dc17bf3"; // Your provided API key
        
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
            .then(response => {
                console.log(response.data)
                setAllWeather(response.data)
            })
            .catch(error => {
                console.error("Error fetching the weather data: ", error);
            })
    }, [result.capital])  // Dependency array to re-fetch when the capital changes

    if (allWeather === null) return null

    // Correct country code handling:
    const countryCode = allWeather.sys.country.toLowerCase()

    return (
        <div>
            <h2>{`Weather in ${result.capital[0]}`}</h2>
            {/* Display the flag using the country code */}
            <img
                alt="country flag"
                src={`https://flagcdn.com/w320/${countryCode}.png`}
                width={50} // Adjust the width as per your design needs
            />
            <p>{`Temperature: ${(allWeather.main.temp - 273.15).toFixed(2)} °C`}</p> {/* Corrected temperature formula */}
            <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`}
            />
            <p>{`Wind: ${allWeather.wind.speed} m/s`}</p>
        </div>
    )
}

export default AllWeather
