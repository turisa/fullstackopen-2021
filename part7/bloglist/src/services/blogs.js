import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );

  return response.data;
};

const addComment = async (id, content) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${id}/comments`,
    { content },
    config
  );

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
};

const blogService = {
  setToken,
  addComment,
  create,
  update,
  remove,
  getAll,
};

export default blogService;
