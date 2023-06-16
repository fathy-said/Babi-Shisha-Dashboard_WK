import { createSlice } from "@reduxjs/toolkit";
import { OneProfileThunk } from "../Thunk/OneProfileThunk";
import { UpdatePassThunk } from "../Thunk/UpdatePassThunk";
import { UpdateProfileThunk } from "../Thunk/UpdateProfileThunk";

let initState = {
    name: "",
    phone: "",
    role_id: "",
    role_name: "",
    avatar: "",
    userId: "",
    address: "",
    userData: {},
    nameError: null,
    phoneError: null,
    passwordError: null,
    avatarError: null,
    OldPasswordError: null,
    addressError: null,
};

let ProfileReducer = createSlice({
    name: "profile",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.nameError = null;
            state.phoneError = null;
            state.passwordError = null;
            state.avatarError = null;
            state.OldPasswordError = null;
            state.addressError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(OneProfileThunk.pending, (state, action) => {})
            .addCase(OneProfileThunk.fulfilled, (state, action) => {
                state.name = action.payload.data.name;
                state.address = action.payload.data.address;
                state.userData = action.payload.data;
                state.phone = action.payload.data.phone;
                state.userId = action.payload.data.id;
                // state.role_id = action.payload.data.role_id;
                state.avatar = action.payload.data.avatar;
                state.role_name = action.payload.data.accountType;
            })
            // =======UpdateUserThunk===========
            .addCase(UpdateProfileThunk.fulfilled, (state, action) => {
                // localStorage.setItem("avatar", action.payload.data.avatar);
                // console.log(action.payload.data.avatar);
            })
            .addCase(UpdateProfileThunk.rejected, (state, action) => {
                state.nameError = action.payload?.data?.name;
                state.phoneError = action.payload?.data?.phone;
                state.avatarError = action.payload?.data?.accountType;
                state.addressError = action.payload?.data?.address;
            })
            .addCase(UpdatePassThunk.rejected, (state, action) => {
                state.passwordError = action.payload?.data?.new_password;
                state.passwordError =
                    action.payload?.data?.new_password_confirmation;
                state.OldPasswordError = action.payload?.data?.old_password;
            });
    },
});

export default ProfileReducer.reducer;

export let { closeError } = ProfileReducer.actions;
