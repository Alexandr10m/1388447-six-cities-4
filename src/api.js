import axios from "axios";


const createAPI = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};


export default createAPI;
