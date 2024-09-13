import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/tasks';

// Fetch all tasks with filters
const getTasks = async (filters) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
      params: filters,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};

// Fetch a single task by ID
const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching task:', err);
    throw err;
  }
};

// Create a new task
const createTask = async (data) => {
  try {
    await axios.post(API_URL, data, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
  } catch (err) {
    console.error('Error creating task:', err);
    throw err;
  }
};

// Update a task
const updateTask = async (id, data) => {
  try {
    await axios.put(`${API_URL}/${id}`, data, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
  } catch (err) {
    console.error('Error updating task:', err);
    throw err;
  }
};

// Delete a task by ID
const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    throw err;
  }
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
