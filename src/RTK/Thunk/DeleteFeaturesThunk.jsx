import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let DeleteFeaturesThunk = createAsyncThunk(
  "features/DeleteFeaturesThunk",
  async (arg, ThunkApi) => {
    // console.log(arg);

    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.delete(`/features/${arg?.id}`);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
