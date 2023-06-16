import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let UpdateCouponThunk = createAsyncThunk(
    "coupons/UpdateCouponThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.put(`/coupons/${arg.id}`, arg);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
