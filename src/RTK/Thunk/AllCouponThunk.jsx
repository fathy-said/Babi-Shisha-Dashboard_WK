import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let AllCouponThunk = createAsyncThunk(
    "coupon/AllCouponThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;

        try {
            // let url = `/users?type=agency`;
            let url = `/coupons?type=agency&per_page=5&page=${arg.page}`;
            let urlSearch = `/coupons?type=agency&per_page=5&page=${arg.page}&handle=${arg.search}`;
            let res = await axios.get(arg.search !== "" ? urlSearch : url);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
