import { createSlice } from "@reduxjs/toolkit";
import { AddProductThunk } from "../Thunk/AddProductThunk";
import { AllFeaturesThunk } from "../Thunk/AllFeaturesThunk";
import { AllProductThunk } from "../Thunk/AllProductThunk";
import { DeleteProductThunk } from "../Thunk/DeleteProductThunk";
import { OneProductThunk } from "../Thunk/OneProductThunk";
import { SelectParentCategoriesThunk } from "../Thunk/SelectParentCategoriesThunk";
import { UpdateProductThunk } from "../Thunk/UpdateProductThunk";
import { UploadImgThunk } from "../Thunk/uploadImgThunk";

let initState = {
    code: null,
    currentPage: 1,
    lastPage: 1,
    productData: [],
    oneImgData: [],
    featuresData: [],
    oneDataProduct: "",
    imgUpload: [],
    oneFeatures: [],
    categoriesSelectData: [],
    oneMainImg: [],
    oneDesc: "",
    oneGeneral: "",
    onePrice: "",
    price_Error: null,
    features_Error: null,
    quantity_Error: null,
    category_id_Error: null,
    images_Error: null,
    MainImg_Error: null,
    name_Error_en: null,
    desc_Error_en: null,
};

let ProductReducer = createSlice({
    name: "product",

    initialState: initState,
    reducers: {
        DataView: (state, action) => {
            state.oneDataProduct = "";
            state.oneImgData = [];
            state.oneMainImg = [];
            state.oneFeatures = [];
        },

        closeError: (state, action) => {
            state.price_Error = null;
            state.features_Error = null;
            state.quantity_Error = null;
            state.category_id_Error = null;
            state.images_Error = null;
            state.MainImg_Error = null;
            state.name_Error_en = null;
            state.desc_Error_en = null;
        },
        closeSelect: (state, action) => {
            state.categoriesSelectData = [];
            state.sub_subcategoriesSelectData = [];
            state.sub_categoriesSelectData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // =======AllServicesThunk===========
            .addCase(AllProductThunk.pending, (state, action) => {})
            .addCase(AllProductThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.productData = action.payload?.data;
                state.currentPage = action.payload?.meta?.current_page;
                state.lastPage = action.payload?.meta?.last_page;
            })
            .addCase(AllProductThunk.rejected, (state, action) => {})
            // .addCase(ServicesStatusThunk.rejected, (state, action) => { })
            // =======DeleteProductThunk===========
            .addCase(DeleteProductThunk.pending, (state, action) => {})
            .addCase(DeleteProductThunk.fulfilled, (state, action) => {})
            // =======UploadImgThunk===========
            .addCase(UploadImgThunk.pending, (state, action) => {})
            .addCase(UploadImgThunk.fulfilled, (state, action) => {
                state.imgUpload = action.payload.data;
            })
            // =======OneProductThunk===========
            .addCase(OneProductThunk.pending, (state, action) => {})
            .addCase(OneProductThunk.fulfilled, (state, action) => {
                state.oneDataProduct = action.payload.data;
                state.oneImgData = action.payload.data.otherImages;
                state.oneMainImg = action.payload.data.mainImage;
                state.oneFeatures = action.payload.data.features;
            })
            // =======SelectParentCategoriesThunk===========
            .addCase(SelectParentCategoriesThunk.pending, (state, action) => {})
            .addCase(SelectParentCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.categoriesSelectData = action.payload?.data;
            })
            // =======SelectSubCategoriesThunk===========
            .addCase(AllFeaturesThunk.pending, (state, action) => {})
            .addCase(AllFeaturesThunk.fulfilled, (state, action) => {
                // console.log(action);
                state.featuresData = action.payload?.data;
            })
            // // =======AddServicesThunk===========
            .addCase(AddProductThunk.fulfilled, (state, action) => {})
            .addCase(AddProductThunk.rejected, (state, action) => {
                state.price_Error = action.payload?.data?.price;
                state.features_Error = action.payload?.data?.features;
                state.quantity_Error = action.payload?.data?.quantity;
                state.category_id_Error = action.payload?.data?.category_id;
                state.images_Error = action.payload?.data?.stored_images;
                state.MainImg_Error = action.payload?.data?.main_image;
                state.name_Error_en = action.payload?.data?.name;
                state.desc_Error_en = action.payload?.data?.description;
            })
            // // =======UpdateProductThunk===========
            .addCase(UpdateProductThunk.fulfilled, (state, action) => {})
            .addCase(UpdateProductThunk.rejected, (state, action) => {
                state.price_Error = action.payload?.data?.price;
                state.features_Error = action.payload?.data?.features;
                state.quantity_Error = action.payload?.data?.quantity;
                state.category_id_Error = action.payload?.data?.category_id;
                state.images_Error = action.payload?.data?.stored_images;
                state.MainImg_Error = action.payload?.data?.main_image;
                state.name_Error_en = action.payload?.data?.name;
                state.desc_Error_en = action.payload?.data?.description;
            });
    },
});

export default ProductReducer.reducer;

export let { closeModal, closeError, DataView, closeSelect } =
    ProductReducer.actions;
