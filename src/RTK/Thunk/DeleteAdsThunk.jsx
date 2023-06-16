import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let DeleteAdsThunk = createAsyncThunk(
    "ads/DeleteAdsThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.delete(`ads/${arg?.id}`);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
