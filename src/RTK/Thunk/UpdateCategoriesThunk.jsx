import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateCategoriesThunk = createAsyncThunk(
    "categories/UpdateCategoriesThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("name", arg?.name);
        formData.append("image", arg?.image);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(`/categories/${arg?.id}`, formData);
            console.log(res.data);

            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
// async (arg, ThunkApi) => {
//     console.log(arg);
//     const formData = new FormData();
//     formData.append(
//         "name",
//         JSON.stringify({ en: arg?.en, ar: arg?.ar, fr: arg?.fr })
//     );
//     formData.append("img", arg?.img);

//     const config = {
//         headers: {
//             "content-type": "multipart/form-data",
//             Locale: localStorage.getItem("language") || "en",
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
//         },
//     };
//     let { rejectWithValue } = ThunkApi;
//     try {
//         let res = await axios.post(
//             `${process.env.REACT_APP_API}/parent_categories/${arg?.id}`,
//             formData,
//             config
//         );
//         return res.data;
//     } catch (error) {
//         // console.log(error.response.data);
//         return rejectWithValue(error.response.data);
//     }
// }
