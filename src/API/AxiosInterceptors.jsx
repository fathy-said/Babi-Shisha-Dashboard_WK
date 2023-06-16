import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { changeUrl } from '../RTK/Reducers/GlobalReducer';

const AxiosInterceptors = ({ children }) => {
  let dispatch = useDispatch()
  // useEffect(() => {
  //   console.log(localStorage.getItem("AccessTokenShisha"))


  // }, [localStorage.getItem("AccessTokenShisha")]);
  useEffect(() => {
    axios.interceptors.response.use(null, (error) => {
      // console.log(error.response.status)
      if (error.response.status == "401") {
        dispatch(changeUrl({ code: error.response.status }))
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }, []);
  return (
    <>
      {children}
    </>
  );
}

export default AxiosInterceptors;
// {
//   "Accept": "application/json, text/plain, */*",
//     "Authorization": "Bearer 12|udC0LG8YKl0Q4px4RJoOxMOZAjxKGiIAfyoyEut9"
// }