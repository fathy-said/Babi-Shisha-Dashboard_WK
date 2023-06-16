import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateFeaturesThunk = createAsyncThunk(
  "features/UpdateFeaturesThunk",
  async (arg, ThunkApi) => {
    // console.log(arg);
    const formData = new FormData();
    formData.append("name", arg?.name);

    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.put(`/features/${arg?.id}`, formData);
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
