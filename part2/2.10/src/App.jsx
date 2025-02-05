import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Mayookha', 
    number: '040-123456', 
    id: 1 },
    { name: 'Ashwin', 
    number: '39-44-5323523', 
    id: 2 },
    { name: 'Adarsh', 
    number: '12-43-234345', 
    id: 3 },
    { name: 'Ajay', 
    number: '39-23-6423122', 
    id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault(); // Prevents form submission from reloading the page

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Add new contact to the phonebook
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));

    // Clear input fields after adding a new contact
    setNewName('');
    setNewNumber('');
  };

  // Filter persons based on search query (case insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search Field */}
      <div>
        filter shown with: <input value={searchQuery} onChange={handleSearchChange} />
      </div>
      <h2>ADD NEW</h2>
      {/* Add New Person Form */}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;