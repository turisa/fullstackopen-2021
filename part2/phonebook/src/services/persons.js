import axios from 'axios';

const baseUrl = 'https://locahost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const update = (id, personObject) => {
  return axios
    .put(`${baseUrl}/${id}`, personObject)
    .then((response) => response.data);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const PersonService = {
  getAll,
  create,
  update,
  del,
};

export default PersonService;
