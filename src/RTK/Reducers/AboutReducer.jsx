import { createSlice } from "@reduxjs/toolkit";
import { OneAboutThunk } from "../Thunk/OneAboutThunk";
import { UpdateAboutThunk } from "../Thunk/UpdateAboutThunk";

let initState = {
    code: null,
    oneImg: "",
    oneAbout: "",
    oneName: {},
    oneDesc: {},
    nameError: null,
    descError: null,
    nameError_en: null,
    descError_en: null,
    avatarError: null,
};

let AboutReducer = createSlice({
    name: "about",

    initialState: initState,
    reducers: {
        closeAbout: (state, action) => {
            state.oneAbout = "";
            state.oneImg = null;
            state.oneName = {};
            state.oneDesc = {};
        },
        closeError: (state, action) => {
            state.nameError_en = null;
            state.descError_en = null;
            state.avatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // =======OneUserThunk===========
            .addCase(OneAboutThunk.fulfilled, (state, action) => {
                state.oneAbout = action.payload?.data;
                state.oneImg = action.payload?.data.image;
                state.oneName = action.payload?.data.title;
                state.oneDesc = action.payload?.data.oneDesc;
            })
            .addCase(OneAboutThunk.rejected, (state, action) => {})
            // =======UpdateAboutThunk===========
            .addCase(UpdateAboutThunk.fulfilled, (state, action) => {})
            .addCase(UpdateAboutThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.title;
                state.descError_en = action.payload?.data?.oneDesc;
                state.avatarError = action.payload?.data?.image;
            });
    },
});

export default AboutReducer.reducer;

export let { closeAbout, closeError } = AboutReducer.actions;
