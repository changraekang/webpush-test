import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "http://52.78.170.177:8080/api/",
  // baseURL: 'http://3.39.203.147:8080/api/', //web서버용 api
});
