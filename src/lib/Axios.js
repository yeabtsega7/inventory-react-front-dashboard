import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/";

// Create an instance of Axios
export const instance = axios.create({
  baseURL: baseURL, // Set the base URL for the requests
  timeout: 5000, // Set a default timeout
  headers: {
    "Content-Type": "application/json", // Set default headers
    // Other default headers can be added here
  },
});
