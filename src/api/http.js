import axios from "axios";
const http = axios.create({
  baseURL: "${process.env.REACT_APP_RECORDS}",
  timeout: 1000000,
  headers: { "X-Custom-Header": "foobar" },
  //   Authorization :  ////token 넣음
});

export default http;
