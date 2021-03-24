import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2000/api/';
axios.defaults.header = { 'Content-Type': 'application/json' };
axios.defaults.withCredentials = true;

async function updateAction(data) {
  return axios.put(`/${data.Id}`, data);
}

async function deleteAction(data) {
  return axios.delete(`/${data.Id}`);
}

async function getAction() {
  return axios.get(`/`);
}

async function getOneAction(id) {
  return axios.get(`/${id}`);
}

async function saveAction(data) {
  return axios.post(`/`, data);
}

const actions = {
  updateAction,
  deleteAction,
  getAction,
  saveAction,
  getOneAction,
};

export default actions;
