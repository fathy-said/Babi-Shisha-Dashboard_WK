import { createSlice } from "@reduxjs/toolkit";
import { AllCouponThunk } from "../Thunk/AllCouponThunk";
import { DeleteCouponThunk } from "../Thunk/DeleteCouponThunk";
import { AddCouponThunk } from "../Thunk/AddCouponThunk";
import { OneCouponThunk } from "../Thunk/OneCouponThunk";
import { UpdateCouponThunk } from "../Thunk/UpdateCouponThunk";

let initState = {
    code: null,
    couponData: [],
    oneCoupon: {},
    currentPage: 1,
    lastPage: 1,
    oneUser: null,
    oneName: "",
    oneEmail: "",
    name_er: null,
    user_er: null,
    percentage_er: null,
    startDataError: null,
    endDataError: null,
};
let CouponReducer = createSlice({
    name: "coupon",

    initialState: initState,
    reducers: {
        closeModal: (state, action) => {
            state.oneUser = null;
            state.oneName = "";
            state.oneEmail = "";
            state.couponData = [];
        },
        closeError: (state, action) => {
            state.name_er = null;
            state.percentage_er = null;
            state.endDataError = null;
            state.startDataError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllCouponThunk.pending, (state, action) => {})
            .addCase(AllCouponThunk.fulfilled, (state, action) => {
                state.couponData = action.payload?.data;
                state.currentPage = action.payload?.meta?.current_page;
                state.lastPage = action.payload?.meta?.last_page;
            })
            // =======OneCouponThunk===========
            .addCase(OneCouponThunk.pending, (state, action) => {})
            .addCase(OneCouponThunk.fulfilled, (state, action) => {
                state.oneCoupon = action.payload?.data;
                // console.log(action.payload?.data);
            })
            .addCase(OneCouponThunk.rejected, (state, action) => {})
            // =======AddCouponThunk===========
            .addCase(AddCouponThunk.rejected, (state, action) => {
                state.name_er = action.payload?.data.name;
                // state.user_er = action.payload?.data.max_user;
                state.startDataError = action.payload?.data.start_date;
                state.endDataError = action.payload?.data.end_date;
                state.percentage_er = action.payload?.data.percentage;
            })
            // =======UpdateCouponThunk===========
            .addCase(UpdateCouponThunk.rejected, (state, action) => {
                state.name_er = action.payload?.data.name;
                // state.user_er = action.payload?.data.max_user;
                state.startDataError = action.payload?.data.start_date;
                state.endDataError = action.payload?.data.end_date;
                state.percentage_er = action.payload?.data.percentage;
            })

            // =======DeleteUserThunk===========
            .addCase(DeleteCouponThunk.fulfilled, (state, action) => {})
            .addCase(DeleteCouponThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default CouponReducer.reducer;

export let { closeModal, closeError } = CouponReducer.actions;
