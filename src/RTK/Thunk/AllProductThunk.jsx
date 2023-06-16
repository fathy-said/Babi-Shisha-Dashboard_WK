import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let AllProductThunk = createAsyncThunk(
    "product/AllProductThunk",
    async (arg, ThunkApi) => {
        console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let url = `products?per_page=5&page=${arg.page}`;
            let urlSearch = `products?per_page=5&page=${arg.page}&handle=${arg.search}`;
            let res = await axios.get(arg.search !== "" ? urlSearch : url);
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
