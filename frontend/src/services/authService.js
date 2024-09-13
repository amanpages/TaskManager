// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  localStorage.setItem('token', response.data.token);
};

const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem('token', response.data.token);
};

const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };
