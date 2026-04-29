import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/crm-ver1/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
