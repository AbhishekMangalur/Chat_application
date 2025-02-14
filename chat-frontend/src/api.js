import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337", // Adjust this URL based on your Strapi backend
});

export default api;
