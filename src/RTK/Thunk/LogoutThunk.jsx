import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let LogoutThunk = createAsyncThunk(
    "login/LogoutThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);

        let { rejectWithValue } = ThunkApi;
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `/auth/logout`,
            headers: {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${localStorage.getItem(
                    "AccessTokenSisha"
                )}`,
            },
        };
        try {
            let res = await axios.request(config);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
