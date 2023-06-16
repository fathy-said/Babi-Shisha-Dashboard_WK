import axios from "axios";
axios.defaults.baseURL = 'https://api-babi-shisha.erp-everest.com';

axios.interceptors.request.use((req) => {
  // Do something before request is sent

  if (!req.url.includes("login")) {
    let token = localStorage.getItem("AccessTokenSisha") || null
    if (token !== null) {
      req.headers.Authorization = `Bearer ${localStorage.getItem("AccessTokenSisha")}`
    }
  }
  // console.log(req)
  return req;
}, (error) => {
  console.log(error)
  // Do something with request error
  return Promise.reject(error);
});