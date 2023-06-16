import { createSlice } from "@reduxjs/toolkit";
import { AllFeaturesThunk } from "../Thunk/AllFeaturesThunk";
import { OneFeaturesThunk } from "../Thunk/OneFeaturesThunk";
import { DeleteFeaturesThunk } from "../Thunk/DeleteFeaturesThunk";
import { UpdateFeaturesThunk } from "../Thunk/UpdateFeaturesThunk";
import { AddFeaturesThunk } from "../Thunk/AddFeaturesThunk";


let initState = {
  code: null,
  featuresData: [],
  currentPage: 1,
  lastPage: 1,

  featuresName: {},
  name_en_Error: null,
  name_ar_Error: null,
  name_fr_Error: null,
};

let FeaturesReducer = createSlice({
  name: "features",

  initialState: initState,
  reducers: {
    closeError: (state, action) => {
      if (action.payload.type === "en") {
        state.name_en_Error = null;
      }
      if (action.payload.type === "all") {
        state.name_fr_Error = null;
        state.name_ar_Error = null;
        state.name_en_Error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // =======allBrand===========
      .addCase(AllFeaturesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.featuresData = action.payload.data;
        state.currentPage = action.payload?.meta?.current_page;
        state.lastPage = action.payload?.meta?.last_page;
      })
      .addCase(AllFeaturesThunk.rejected, (state, action) => {})
      // =======OneCategoriesThunk===========
      .addCase(OneFeaturesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.categoriesName = action.payload.data.name;
      })
      .addCase(OneFeaturesThunk.rejected, (state, action) => {})

      // =======AddCategoriesThunk===========
      .addCase(AddFeaturesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(AddFeaturesThunk.rejected, (state, action) => {
        state.name_en_Error = action.payload?.data?.["name.en"];
        state.name_ar_Error = action.payload?.data?.["name.ar"];
        state.name_fr_Error = action.payload?.data?.["name.fr"];

      })
      // =======UpdateCategoriesThunk===========
      .addCase(UpdateFeaturesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(UpdateFeaturesThunk.rejected, (state, action) => {
        state.name_en_Error = action.payload?.data?.["name.en"];
        state.name_ar_Error = action.payload?.data?.["name.ar"];
        state.name_fr_Error = action.payload?.data?.["name.fr"];

      })
      // =======DeleteCategoriesThunk===========
      .addCase(DeleteFeaturesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
      });
    // =======CategoriesStatusThunk===========

    // .addCase(DeleteBrand.rejected, (state, action) => {})
  },
});

export default FeaturesReducer.reducer;

export let { closeError } = FeaturesReducer.actions;
