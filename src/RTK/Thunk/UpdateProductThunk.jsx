// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export let UpdateProductThunk = createAsyncThunk(
//     "product/UpdateProductThunk",
//     async (arg, ThunkApi) => {
//         console.log(arg);

//         let { rejectWithValue } = ThunkApi;
//         const formData = new FormData();
//         formData.append("name", arg?.name);
//         formData.append("quantity", arg?.quantity);
//         formData.append("features", JSON.stringify(arg?.features));
//         formData.append("description", arg?.description);
//         formData.append("price", arg?.price);
//         formData.append("category_id", arg?.category_id);
//         formData.append("stored_images", JSON.stringify(arg?.stored_images));
//         formData.append("keep_images", JSON.stringify(arg?.keep_images));
//         formData.append("main_image", arg?.main_image);
//         try {
//             let res = await axios.post(`/products/${arg.id}`, FormData);
//             console.log(res.data);
//             return res.data;
//         } catch (error) {
//             console.log(error.response.data);
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateProductThunk = createAsyncThunk(
    "product/UpdateProductThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("name", arg?.name);
        formData.append("quantity", arg?.quantity);
        formData.append("features", JSON.stringify(arg?.features));
        formData.append("description", arg?.description);
        formData.append("price", arg?.price);
        formData.append("category_id", arg?.category_id);
        formData.append("stored_images", JSON.stringify(arg?.stored_images));
        formData.append("keep_images", JSON.stringify(arg?.keep_images));
        formData.append("main_image", arg?.main_image);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/products/${arg.id}`, formData);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
