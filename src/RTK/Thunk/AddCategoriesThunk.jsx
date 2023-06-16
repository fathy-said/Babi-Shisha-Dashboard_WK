import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let AddCategoriesThunk = createAsyncThunk(
    "categories/AddCategoriesThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("name", arg?.name);
        formData.append("image", arg?.image);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/categories`, formData);
            console.log(res.data);

            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
