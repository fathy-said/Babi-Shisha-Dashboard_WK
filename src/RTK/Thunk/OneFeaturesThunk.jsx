import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let OneFeaturesThunk = createAsyncThunk(
  "features/OneFeaturesThunk",
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.get(`/features/${arg?.id}`);
      return res.data;
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
