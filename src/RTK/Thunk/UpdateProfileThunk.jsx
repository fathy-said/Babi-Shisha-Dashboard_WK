import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateProfileThunk = createAsyncThunk(
    "profile/UpdateProfileThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;

        const formData = new FormData();
        formData.append("name", arg.name);
        formData.append("avatar", arg?.avatar);
        formData.append("phone", arg?.phone);
        formData.append("address", arg?.address);
        try {
            let res = await axios.post(`/auth/profile`, formData);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
