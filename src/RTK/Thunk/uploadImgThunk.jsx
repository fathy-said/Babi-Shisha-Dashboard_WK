import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UploadImgThunk = createAsyncThunk(
    "services/UploadImgThunk",
    async (arg, ThunkApi) => {
        // console.log(arg.img);
        const formData = new FormData();
        formData.append("image", arg?.img);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/upload_image`, formData);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);
