import axios from "axios";

// Confirme se o IP ainda é este (muda se reiniciar o modem/pc)
const API_URL = "http://192.168.0.135:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
