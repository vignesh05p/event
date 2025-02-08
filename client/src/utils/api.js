// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust to your backend URL when deployed
});

export default api;
