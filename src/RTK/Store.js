import { configureStore } from "@reduxjs/toolkit";

import AboutReducer from "./Reducers/AboutReducer";
import AdsReducer from "./Reducers/AdsReducer";
import CategoriesReducer from "./Reducers/CategoriesReducer";
import ContactReducer from "./Reducers/ContactReducer";
import DashReducer from "./Reducers/DashReducer";
import LoginReducer from "./Reducers/LoginReducer";
import MessageReducer from "./Reducers/MessageReducer";
import ProductReducer from "./Reducers/ProductReducer";
import ProfileReducer from "./Reducers/ProfileReducer";
import UserReducer from "./Reducers/UserReducer";
import FeaturesReducer from "./Reducers/FeaturesReducer";
import CouponReducer from "./Reducers/CouponReducer";

export let Store = configureStore({
    reducer: {
        LoginReducer,
        UserReducer,
        CategoriesReducer,
        ContactReducer,
        ProfileReducer,
        AboutReducer,
        DashReducer,
        AdsReducer,
        ProductReducer,
        MessageReducer,
        FeaturesReducer,
        CouponReducer,
    },
});
