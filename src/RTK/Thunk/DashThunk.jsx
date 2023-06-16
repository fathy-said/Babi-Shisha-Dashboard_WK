import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let DashThunk = createAsyncThunk(
    "dash/DashThunk",
    async (arg, ThunkApi) => {
        let adminTLink = "/dashboard/admin";
        let agencyTLink = "/dashboard/agency";
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                localStorage.getItem("accountType") == "agency"
                    ? agencyTLink
                    : adminTLink
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
