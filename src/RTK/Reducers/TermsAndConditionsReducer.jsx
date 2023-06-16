import { createSlice } from "@reduxjs/toolkit";
import { AllTermsAndConditionsThunk } from "../Thunk/AllTermsAndConditionsThunk";
import { UpdateTermsAndConditionsThunk } from "../Thunk/UpdateTermsAndConditionsThunk";

let initState = {
  code: null,
  terms_and_conditionsData: [],
  currentPage: 1,
  lastPage: 1,


  terms_and_conditionsContent: {},
  content_en_Error: null,
  content_ar_Error: null,
  content_fr_Error: null,
};

let TermsAndConditionsReducer = createSlice({
  name: "categories",

  initialState: initState,
  reducers: {
    closeError: (state, action) => {
      if (action.payload.type === "en") {
        state.content_en_Error = null;
      }
      if (action.payload.type === "all") {
        state.content_fr_Error = null;
        state.content_ar_Error = null;
        state.content_en_Error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // =======allBrand===========
      .addCase(AllTermsAndConditionsThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.categoriesData = action.payload.data;
        state.currentPage = action.payload?.meta?.current_page;
        state.lastPage = action.payload?.meta?.last_page;
      })
      .addCase(AllTermsAndConditionsThunk.rejected, (state, action) => {})
      // =======UpdateCategoriesThunk===========

      .addCase(UpdateTermsAndConditionsThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(UpdateTermsAndConditionsThunk.rejected, (state, action) => {
        state.content_en_Error = action.payload?.data?.["content.en"];
        state.content_ar_Error = action.payload?.data?.["content.ar"];
        state.content_fr_Error = action.payload?.data?.["content.fr"];

        state.avatarError = action.payload?.data?.img;
      })
  },
});

export default TermsAndConditionsReducer.reducer;

export let { closeError } = TermsAndConditionsReducer.actions;
