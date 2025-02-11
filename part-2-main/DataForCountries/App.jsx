import React, { useState, useEffect } from 'react';
import axios from 'axios';

// App Component
const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch data from the API when the query changes
  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => setCountries(response.data))
        .catch((error) => console.error('Error fetching data: ', error));
    } else {
      setCountries([]);
    }
  }, [query]);

  // Handle search input
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Show country details when a user clicks on a country
  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  // Clear the selected country view
  const clearSelectedCountry = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={handleSearch}
      />

      {/* Display the number of countries based on the query */}
      {countries.length > 10 && <p>Too many matches, please make the search more specific</p>}

      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => showCountryDetails(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {countries.length === 1 && (
        <CountryDetail country={countries[0]} clearSelectedCountry={clearSelectedCountry} />
      )}

      {/* Show country details if selected */}
      {selectedCountry && (
        <CountryDetail country={selectedCountry} clearSelectedCountry={clearSelectedCountry} />
      )}
    </div>
  );
};

// Component to display the country details
const CountryDetail = ({ country, clearSelectedCountry }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      <button onClick={clearSelectedCountry}>Back to list</button>
    </div>
  );
};

export default App;
