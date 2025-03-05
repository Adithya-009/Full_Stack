import React, { useState, useEffect } from 'react'
import OneCountryDisplay from './OneCountryDisplay'
import axios from 'axios'

const Results = ({ result }) => {
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null) // To handle errors

  const handleShowClick = () => {
    setShow(!show)
  }

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if (result.capital && result.capital[0]) {
      // Log to verify capital name
      console.log(`Fetching weather for ${result.capital[0]}`)

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=3aeaafe7961e4d344160004b8dc17bf3
        `


        )
        .then(response => {
          console.log('Weather response:', response.data) // Log the full response to check the structure
          setWeather(response.data)
          setError(null) // Reset error if data is fetched successfully
        })
        .catch(err => {
          console.error('Error fetching weather:', err)
          setError('Failed to fetch weather data') // Set error if there's an issue
        })
    } else {
      setError('Capital city not available') // Handle case where capital is missing
    }
  }, [result]) // Depend on result to trigger re-fetch on capital change

  return (
    <li>
      {/* Display country name */}
      {result.name.common}
      
      {/* Display flag image */}
      <img src={result.flags.png} alt={`Flag of ${result.name.common}`} height="30" width="50" />
      
      {/* Display error message if any */}
      {error && <p>{error}</p>}

      {/* Show weather if available */}
      

      {/* Toggle button to show/hide country details */}
      <button onClick={handleShowClick}>show</button>

      {/* Show country details when 'show' state is true */}
      {show && <OneCountryDisplay key={result.name.common} result={result} />}
    </li>
  )
}

export default Results
