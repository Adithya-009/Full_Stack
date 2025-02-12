import { useEffect, useState } from 'react';
import axios from 'axios';
import AllWeather from './AllWeather';

const OneCountryDisplay = ({ result }) => {
    const keys = Object.keys(result.languages);
    const [allWeather, setAllWeather] = useState(null);

    useEffect(() => {
        const api_key = "3aeaafe7961e4d344160004b8dc17bf3"; // Your provided API key
        
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital[0]}&appid=${api_key}`)
          .then(response => {
            console.log(response.data);
            setAllWeather(response.data); // Update the state with the weather data
          })
          .catch(error => {
            console.error("Error fetching the weather data: ", error);
          });
    }, [result.capital]);

    if (!allWeather) {
        return <p>Loading weather data...</p>  // Show a loading message while weather data is being fetched
    }

    // Custom flags for specific countries (example for UK and US)
    const customFlag = (countryCode) => {
        // Example for United Kingdom (UK) where the flag might be different based on preference
        if (countryCode === "gb") {
            return "https://flagcdn.com/w320/gb-eng.png"; // Specific regional flag (England)
        }
        if (countryCode === "us") {
            return "https://flagcdn.com/w320/us.png";  // Default flag for the US
        }
        return `https://flagcdn.com/w320/${countryCode}.png`;  // Default for other countries
    };

    // Country code in ISO 3166-1 alpha-2 format
    const countryCode = allWeather.sys.country.toLowerCase();

    return (
        <div>
            <div>
                <h1>{result.name.common}</h1>
                <p>{result.capital[0]}</p>
                <p>{result.area} km²</p>
                <h3>Languages:</h3>
                <ul>
                    {keys.map((key, index) => (
                        <li key={index}>{result.languages[key]}</li>
                    ))}
                </ul>
                {/* Display the flag based on the custom flag function */}
                <img
                    alt="country flag"
                    src={customFlag(countryCode)}  // Use custom flag function
                    height="200"
                    width="250"
                />
            </div>

            {/* Pass weather data to AllWeather component */}
            <AllWeather result={result} allWeather={allWeather} />
        </div>
    );
};

export default OneCountryDisplay;
