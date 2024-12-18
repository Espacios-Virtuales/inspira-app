import axios from "axios";

const http2 = axios.create({
  baseURL: "http://localhost:8084",
  headers: {
    "Content-type": "application/json",
  }
});

export default http2;