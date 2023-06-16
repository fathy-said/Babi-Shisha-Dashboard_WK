import { createSlice } from "@reduxjs/toolkit";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { DeleteUserThunk } from "../Thunk/DeleteUserThunk";

let initState = {
    code: null,
    userData: [],
    currentPage: 1,
    lastPage: 1,
    oneUser: null,
    oneImg: "",
    oneRole: "",
    oneName: "",
    oneEmail: "",
    roleData: [],
    nameError: null,
    emailError: null,
    passwordError: null,
    role_idError: null,
    avatarError: null,
};

let UserReducer = createSlice({
    name: "user",

    initialState: initState,
    reducers: {
        closeModal: (state, action) => {
            state.oneUser = null;
            state.oneImg = "";
            state.oneRole = "";
            state.oneName = "";
            state.oneEmail = "";
            state.userData = [];
        },
        closeError: (state, action) => {
            state.nameError = null;
            state.emailError = null;
            state.passwordError = null;
            state.role_idError = null;
            state.avatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllUsersThunk.pending, (state, action) => {})
            .addCase(AllUsersThunk.fulfilled, (state, action) => {
                state.userData = action.payload?.data;
                state.currentPage = action.payload?.meta.current_page;
                state.lastPage = action.payload?.meta.last_page;
            })
            .addCase(AllUsersThunk.rejected, (state, action) => {})
            // =======OneUserThunk===========

            // =======DeleteUserThunk===========
            .addCase(DeleteUserThunk.fulfilled, (state, action) => {})
            .addCase(DeleteUserThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default UserReducer.reducer;

export let { closeModal, closeError } = UserReducer.actions;
