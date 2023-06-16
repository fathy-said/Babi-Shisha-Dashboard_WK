import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let AllFeaturesThunk = createAsyncThunk(
    "product/AllFeaturesThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(`/features`);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
