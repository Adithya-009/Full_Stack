import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Prevent duplicate names
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName(''); // Clear input field after adding
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>name:</label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>add</button>
      </form>

      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {persons.map(person => (
          <li key={person.name} style={{ padding: '5px 0' }}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
