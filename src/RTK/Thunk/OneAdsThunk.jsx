import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let OneAdsThunk = createAsyncThunk(
    "ads/OneAdsThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(`/ads/${arg.id}`);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
