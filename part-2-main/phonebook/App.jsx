import { useState, useEffect } from "react";
import { getAllPersons, addPerson, updatePerson, deletePerson } from "./services/persons.jsx";

// Filter Component
const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
);

// PersonForm Component
const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPersonHandler }) => (
  <form onSubmit={addPersonHandler}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

// Person Component
const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} - {person.number}
    <button onClick={() => handleDelete(person.id)}>Delete</button>
  </li>
);

// Persons Component
const Persons = ({ persons, handleDelete }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(""); // State for notification message

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchPersons = async () => {
      const personsData = await getAllPersons();  // Use the service to fetch persons
      setPersons(personsData);
    };
    fetchPersons();
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addPersonHandler = async (event) => {
    event.preventDefault();

    // Check if the person already exists
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to update the number?`
      );
      if (confirmUpdate) {
        // If the user confirms, update the number using PUT
        const updatedPerson = { ...existingPerson, number: newNumber };
        await updatePerson(existingPerson.id, updatedPerson);  // Update using PUT
        setPersons(persons.map(person => (person.id === existingPerson.id ? updatedPerson : person)));
        
        // Show notification and reset the form
        setNotificationMessage(`Updated number for ${newName}`);
        setNewName("");
        setNewNumber("");
        setTimeout(() => setNotificationMessage(""), 5000); // Hide message after 5 seconds
      }
      return;
    }

    // If the person doesn't exist, add them to the phonebook
    const personObject = { name: newName, number: newNumber };
    const addedPerson = await addPerson(personObject);  // Use the service to add a person
    setPersons([...persons, addedPerson]);
    
    // Show notification and reset the form
    setNotificationMessage(`Added ${newName}`);
    setNewName("");
    setNewNumber("");
    setTimeout(() => setNotificationMessage(""), 5000); // Hide message after 5 seconds
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      await deletePerson(id);  // Use the service to delete a person
      setPersons(persons.filter(person => person.id !== id));
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPersonHandler={addPersonHandler}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />

      {/* Notification Message */}
      {notificationMessage && (
        <div style={{ color: "green", padding: "10px", marginTop: "10px", border: "1px solid green" }}>
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default App;
