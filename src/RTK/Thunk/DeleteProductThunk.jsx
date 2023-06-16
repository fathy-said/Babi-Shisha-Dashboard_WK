import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let DeleteProductThunk = createAsyncThunk(
    "product/DeleteProductThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.delete(`/products/${arg?.id}`);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
