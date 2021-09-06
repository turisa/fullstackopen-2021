import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (personObject) =>
  axios.post(baseUrl, personObject).then((response) => response.data);

const update = (id, personObject) =>
  axios.put(`${baseUrl}/${id}`, personObject).then((response) => response.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const PersonService = {
  getAll,
  create,
  update,
  remove,
};

export default PersonService;
