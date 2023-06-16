import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let AddCouponThunk = createAsyncThunk(
    "coupon/AddCouponThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/coupons`, arg);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
