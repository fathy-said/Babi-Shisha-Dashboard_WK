import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let OneAboutThunk = createAsyncThunk(
    "about/OneAboutThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(`/about_us`);
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
