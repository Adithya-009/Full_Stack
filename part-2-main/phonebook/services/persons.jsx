// services/persons.jsx
import axios from "axios";

const baseUrl = "http://localhost:3003/persons";

// Get all persons
export const getAllPersons = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
  }
};

// Add a new person
export const addPerson = async (personObject) => {
  try {
    const response = await axios.post(baseUrl, personObject);
    return response.data;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

// Update an existing person
export const updatePerson = async (id, updatedPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
    return response.data;
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

// Delete a person by ID
export const deletePerson = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};
