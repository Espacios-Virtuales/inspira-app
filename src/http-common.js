import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8880",
  headers: {
    "Content-type": "application/json",
  }
});