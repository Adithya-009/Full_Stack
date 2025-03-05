import axios from 'axios';

const baseUrl = 'https://full-stack-x6vl.onrender.com/api/persons'; // Update this when deploying

const getAll = () => axios.get(baseUrl).then(response => response.data);
const create = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data);
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

export default { getAll, create, remove };
