import axios from "axios";

// Confirme seu ip.
const API_URL = "http://192.168.0.135:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
