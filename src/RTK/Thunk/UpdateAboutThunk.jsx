import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateAboutThunk = createAsyncThunk(
    "about/UpdateAboutThunk",
    async (arg, ThunkApi) => {
        const formData = new FormData();
        formData.append("title", arg.name);
        formData.append("description", arg.desc);
        formData.append("image", arg?.img);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/about_us`, formData);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
