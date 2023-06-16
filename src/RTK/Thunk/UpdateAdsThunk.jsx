import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateAdsThunk = createAsyncThunk(
    "ads/UpdateAdsThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("title", arg.name);
        formData.append("company_name", arg.company_name);
        // formData.append("description", JSON.stringify(arg.desc));
        formData.append("image", arg?.img);
        formData.append("discount", arg?.discount);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/ads/${arg.id}`, formData);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
