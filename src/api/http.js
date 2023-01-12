import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000000,
  headers: { "X-Custom-Header": "foobar" },
  //   Authorization :  ////token 넣음
});

export default http;
