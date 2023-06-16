import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let ContactThunk = createAsyncThunk(
    "contact/ContactThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;

        try {
            let url = `/contact_us?per_page=5&page=${arg.page}`;
            let urlSearch = `/contact?per_page=5&page=${arg.page}&handle=${arg.search}`;
            let res = await axios.get(arg.search !== "" ? urlSearch : url);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
