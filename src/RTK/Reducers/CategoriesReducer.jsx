import { createSlice } from "@reduxjs/toolkit";
import { AddCategoriesThunk } from "../Thunk/AddCategoriesThunk";
import { AllCategoriesThunk } from "../Thunk/AllCategoriesThunk";
import { DeleteCategoriesThunk } from "../Thunk/DeleteCategoriesThunk";
import { OneCategoriesThunk } from "../Thunk/OneCategoriesThunk";
import { UpdateCategoriesThunk } from "../Thunk/UpdateCategoriesThunk";

let initState = {
    code: null,
    categoriesData: [],
    currentPage: 1,
    lastPage: 1,

    categoriesImg: "",
    categoriesName: {},
    name_en_Error: null,
    name_ar_Error: null,
    name_fr_Error: null,
    avatarError: null,
};

let CategoriesReducer = createSlice({
    name: "categories",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            if (action.payload.type === "en") {
                state.name_en_Error = null;
            }
            if (action.payload.type === "img") {
                state.avatarError = null;
            }
            if (action.payload.type === "all") {
                state.avatarError = null;
                state.name_fr_Error = null;
                state.name_ar_Error = null;
                state.name_en_Error = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.categoriesData = action.payload.data;
                state.currentPage = action.payload?.meta?.current_page;
                state.lastPage = action.payload?.meta?.last_page;
            })
            .addCase(AllCategoriesThunk.rejected, (state, action) => {})
            // =======OneCategoriesThunk===========
            .addCase(OneCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.categoriesImg = action.payload.data.image;
                state.categoriesName = action.payload.data.name;
            })
            .addCase(OneCategoriesThunk.rejected, (state, action) => {})

            // =======AddCategoriesThunk===========
            .addCase(AddCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(AddCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];

                state.avatarError = action.payload?.data?.img;
            })
            // =======UpdateCategoriesThunk===========
            .addCase(UpdateCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(UpdateCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];

                state.avatarError = action.payload?.data?.img;
            })
            // =======DeleteCategoriesThunk===========
            .addCase(DeleteCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            });
        // =======CategoriesStatusThunk===========

        // .addCase(DeleteBrand.rejected, (state, action) => {})
    },
});

export default CategoriesReducer.reducer;

export let { closeError } = CategoriesReducer.actions;
