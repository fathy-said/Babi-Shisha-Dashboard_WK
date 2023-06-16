import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let AllUsersThunk = createAsyncThunk(
    "user/AllUsersThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;

        try {
            // let url = `/users?type=agency`;
            let url = `/users?type=agency&per_page=5&page=${arg.page}`;
            let urlSearch = `/users?type=agency&per_page=5&page=${arg.page}&handle=${arg.search}`;
            let res = await axios.get(arg.search !== "" ? urlSearch : url);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
