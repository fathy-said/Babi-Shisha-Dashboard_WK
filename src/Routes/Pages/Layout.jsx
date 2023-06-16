import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Header, SidBar } from "../../components/";
import axios from "axios";

const drawerWidth = 280;
const HTTP_UNAUTHORIZED = 401,
    HTTP_FORBIDDEN = 403,
    HTTP_NOT_FOUND = 404;
const Layout = (props) => {
    let navigate = useNavigate();
    const { window } = props;
    let { t, i18n } = useTranslation();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    // const location = useLocation();

    // ======axios_interceptors===============
    useEffect(() => {
        axios.interceptors.response.use(null, (error) => {
            // console.log(error.response.status)
            if (error.response.status == HTTP_UNAUTHORIZED) {
                navigate("/");
                localStorage.clear();
            } else if (error.response.status == HTTP_NOT_FOUND) {
                navigate("page404");
            } else if (error.response.status == HTTP_FORBIDDEN) {
                navigate("/");
                localStorage.clear();
            }
            return Promise.reject(error);
        });
    }, [navigate]);
    //handle language
    useEffect(() => {
        if (i18n.language === "ar") {
            document.querySelector("html").lang = "ar";
            document.querySelector("html").dir = "rtl";
        } else {
            document.querySelector("html").lang = "en";
            document.querySelector("html").dir = "ltr";
        }
    }, [i18n.language]);
    // check token
    useEffect(() => {
        if (!localStorage.getItem("AccessTokenSisha")) {
            localStorage.clear();
            navigate("/");
        }
    }, [navigate]);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                }}
            >
                {/* <CssBaseline /> */}
                <Header {...{ handleDrawerToggle, i18n, drawerWidth }} />
                <SidBar
                    {...{
                        drawerWidth,
                        container,
                        i18n,
                        mobileOpen,
                        handleDrawerToggle,
                        setMobileOpen,
                    }}
                />
                <Box
                    component="main"
                    sx={{
                        mt: "20px",
                        width: {
                            xs: "100%",
                            sm: `calc(100% - ${drawerWidth}px)`,
                        },
                        overflow: "hidden",
                    }}
                >
                    <Toolbar />
                    {/* <div className=' max-w-[1280px] mx-auto'>
            <Outlet />
          </div> */}
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};
Layout.propTypes = {
    window: PropTypes.func,
};
export default Layout;
