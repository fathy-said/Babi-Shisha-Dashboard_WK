import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateTermsAndConditionsThunk = createAsyncThunk(
  "terms_and_conditions/UpdateTermsAndConditionsThunk",
  async (arg, ThunkApi) => {
    // console.log(arg);
    const formData = new FormData();
    formData.append("content", arg?.content);

    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.post(`/terms_and_conditions/${arg?.id}`, formData);
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
