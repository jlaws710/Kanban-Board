import axios from "axios";

const API_URL = "http://localhost:8000/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}?status=${status}`);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};