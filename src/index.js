import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import "./API/axios-global"
import App from './App';
import { Provider } from 'react-redux';
import { Store } from './RTK/Store';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// Add a response interceptor
/*
* response interceptor then catch
* */

// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data

//   return response;
// }, function (error) {

//   let errorCode = error.response.status;
//   let currentPathName = window.location.pathname
//   if (errorCode === HTTP_UNAUTHORIZED) {

//     // Redirect User To Login If The Current Url Is not Login Page
//     if (currentPathName !== '/') {
//       localStorage.clear();
//       window.location.replace('/');

//     } else {

//       /*
//       * Then The Current Url Is Already Login Route ,
//       * so start to show error message to user
//       * */

//       console.log(error.response.data.msg)
//     }
//   } else if (errorCode === HTTP_FORBIDDEN) {
//     if (currentPathName !== '/admin') {
//       window.location.replace('/admin');
//     }
//   } else if (errorCode === HTTP_NOT_FOUND) {
//     // it's Not found error
//     //console.log('not found response');
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

// const [openAlert, setOpenAlert] = React.useState(false);
// const [deleteId, setDeleteId] = React.useState(0);
// setOpenAlert(true)
// setDeleteId(row.id)
//  <AlertDialog open={openAlert} setOpen={setOpenAlert} handleDelete={handleDeleteBrand} deleteId={deleteId} setDeleteId={setDeleteId} />
