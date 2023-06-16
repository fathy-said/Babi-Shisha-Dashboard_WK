import { createSlice } from "@reduxjs/toolkit";
import { AddAdsThunk } from "../Thunk/AddAdsThunk";
import { AllAdsThunk } from "../Thunk/AllAdsThunk";
import { DeleteAdsThunk } from "../Thunk/DeleteAdsThunk";
import { OneAdsThunk } from "../Thunk/OneAdsThunk";
import { UpdateAdsThunk } from "../Thunk/UpdateAdsThunk";

let initState = {
    code: null,
    adsData: [],
    currentPage: 1,
    lastPage: 1,
    oneImg: "",
    oneName: "",
    oneDesc: "",
    oneAds: "",
    oneDisc: "",
    roleData: [],
    avatarError: null,
    discountError: null,
    nameError_en: null,
    descError_en: null,
    company_name_err: null,
};

let AdsReducer = createSlice({
    name: "ads",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.nameError_en = null;
            state.descError_en = null;
            state.avatarError = null;
            state.discountError = null;
            state.company_name_err = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======ads===========
            .addCase(AllAdsThunk.pending, (state, action) => {})
            .addCase(AllAdsThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.adsData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllAdsThunk.rejected, (state, action) => {})

            // =======AddAdsThunk===========
            .addCase(AddAdsThunk.fulfilled, (state, action) => {})
            .addCase(AddAdsThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.title;
                state.avatarError = action.payload?.data?.image;
                state.company_name_err = action.payload?.data?.company_name;
                state.discountError = action.payload?.data?.discount;
            })
            // =======UpdateAdsThunk===========
            .addCase(UpdateAdsThunk.fulfilled, (state, action) => {})
            .addCase(UpdateAdsThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.title;
                state.avatarError = action.payload?.data?.image;
                state.company_name_err = action.payload?.data?.company_name;
                state.discountError = action.payload?.data?.discount;
            })
            // =======OneAdsThunk===========
            .addCase(OneAdsThunk.fulfilled, (state, action) => {
                state.oneAds = action.payload?.data;
                state.oneImg = action.payload?.data.image;
                state.oneName = action.payload?.data.name;
                state.oneDesc = action.payload?.data.oneDesc;
                state.oneDisc = action.payload?.data.oneDesc;
            })
            // // =======DeleteUserThunk===========
            .addCase(DeleteAdsThunk.fulfilled, (state, action) => {})
            .addCase(DeleteAdsThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default AdsReducer.reducer;

export let { closeModal, closeError } = AdsReducer.actions;
