import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let AllCategoriesThunk = createAsyncThunk(
    "categories/AllCategoriesThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;

        try {
            let url = `/categories?per_page=5&page=${arg.page}`;
            let urlSearch = `/categories?per_page=5&page=${arg.page}&handle=${arg.search}`;
            let res = await axios.get(arg.search !== "" ? urlSearch : url);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
