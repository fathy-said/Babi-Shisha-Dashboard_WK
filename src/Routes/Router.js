import { createBrowserRouter } from "react-router-dom";
import TestBox from "../HooK/TestBox";
import {
    AboutBox,
    AdsAEditBox,
    AdsAddBox,
    AdsBox,
    ContactBox,
    ProductEdit,
    ProductNew,
    ProfileBox,
} from "../components";
import CategoriesEdit from "../components/CategoriesEdit/CategoriesEdit";
import CouponEdit from "../components/CouponEdit/CouponEdit";
import CouponNew from "../components/CouponNew/CouponNew";
import DeliveryEdit from "../components/DeliveryEdit/DeliveryEdit";
import DeliveryNew from "../components/DeliveryNew/DeliveryNew";
import FeaturesEdit from "../components/FeaturesEdit/FeaturesEdit";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Categories from "./Pages/Categories";
import Coupon from "./Pages/Coupon";
import Dashboard from "./Pages/Dashboard";
import Delivery from "./Pages/Delivery";
import Features from "./Pages/Features";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Users from "./Pages/Users";

export let Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <div>errorElement</div>,
    },
    {
        path: "/admin",
        element: <Layout />,
        errorElement: <div>errorElement</div>,
        children: [
            { index: true, element: <Dashboard /> },

            {
                path: "contact",
                element: (
                    <TestBox type="admin">
                        <ContactBox />
                    </TestBox>
                ),
            },
            {
                path: "about",
                element: (
                    <TestBox type="admin">
                        <AboutBox />
                    </TestBox>
                ),
            },
            {
                path: "ads",
                element: (
                    <TestBox type="admin">
                        <AdsBox />
                    </TestBox>
                ),
            },
            {
                path: "ads/add",
                element: (
                    <TestBox type="admin">
                        <AdsAddBox />
                    </TestBox>
                ),
            },
            {
                path: "ads/edit/:editAds",
                element: (
                    <TestBox type="admin">
                        <AdsAEditBox />
                    </TestBox>
                ),
            },
            {
                path: "users",
                element: (
                    <TestBox type="admin">
                        <Users />
                    </TestBox>
                ),
            },

            {
                path: "categories",
                element: (
                    <TestBox type="agency">
                        <Categories />
                    </TestBox>
                ),
            },
            {
                path: "delivery",
                element: (
                    <TestBox type="agency">
                        <Delivery />
                    </TestBox>
                ),
            },
            {
                path: "delivery/add",
                element: (
                    <TestBox type="agency">
                        <DeliveryNew />
                    </TestBox>
                ),
            },
            {
                path: "delivery/edit",
                element: (
                    <TestBox type="agency">
                        <DeliveryEdit />
                    </TestBox>
                ),
            },
            {
                path: "coupon",
                element: (
                    <TestBox type="agency">
                        <Coupon />
                    </TestBox>
                ),
            },
            {
                path: "coupon/add",
                element: (
                    <TestBox type="agency">
                        <CouponNew />
                    </TestBox>
                ),
            },
            {
                path: "coupon/edit/:editCoupon",
                element: (
                    <TestBox type="agency">
                        <CouponEdit />
                    </TestBox>
                ),
            },
            {
                path: "termsandconditions",
                element: (
                    <TestBox type="agency">
                        <TermsAndConditions />
                    </TestBox>
                ),
            },
            {
                path: "features",
                element: (
                    <TestBox type="agency">
                        <Features />
                    </TestBox>
                ),
            },
            {
                path: "features/edit/:editFeatures",
                element: (
                    <TestBox type="agency">
                        <FeaturesEdit />
                    </TestBox>
                ),
            },
            {
                path: "categories/edit/:editCategories",
                element: (
                    <TestBox type="agency">
                        <CategoriesEdit />
                    </TestBox>
                ),
            },
            {
                path: "product",

                element: (
                    <TestBox type="agency">
                        <Product />
                    </TestBox>
                ),
            },
            {
                path: "product/add",
                element: (
                    <TestBox type="agency">
                        <ProductNew />
                    </TestBox>
                ),
            },
            {
                path: "product/edit/:productEdit",
                element: (
                    <TestBox type="agency">
                        <ProductEdit />
                    </TestBox>
                ),
            },
            {
                path: "profile",
                element: <ProfileBox />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
