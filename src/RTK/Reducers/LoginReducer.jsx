import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";

let initState = {
    code: null,
    token: null,
};

let LoginReducer = createSlice({
    name: "login",

    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LoginThunk.pending, (state, action) => { })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.code = action.payload.code;
                state.token = action.payload.data.token;
                localStorage.setItem("AccessTokenSisha", action.payload.data.token);
                localStorage.setItem("avatar", action.payload.data.avatar);
                localStorage.setItem("user_name", action.payload.data.name);
                localStorage.setItem("accountType", action.payload.data.accountType);
                // localStorage.setItem("permissions", JSON.stringify(action.payload.data.permissions));
                // localStorage.setItem("logo_dh", action.payload.data.siteLogo);
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.code = action.payload.code;
                localStorage.setItem("AccessTokenSisha", "");
            });
    },
});

export default LoginReducer.reducer;

// export { }=LoginReducer.actions
