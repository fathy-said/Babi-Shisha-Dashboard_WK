import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let OneCouponThunk = createAsyncThunk(
    "coupons/OneCouponThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(`/coupons/${arg.id}`);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
