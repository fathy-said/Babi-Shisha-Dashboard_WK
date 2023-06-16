import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let LoginThunk = createAsyncThunk('login/LoginThunk', async (arg, ThunkApi) => {
  let { rejectWithValue } = ThunkApi
  try {
    let res = await axios.post(`/auth/public/login`, {
      phone: arg?.phone,
      password: arg?.pass
    })

    return res.data
  } catch (error) {
    // console.log(error.response.data)
    return rejectWithValue(error.response.data)
  }
})

