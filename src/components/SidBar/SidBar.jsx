import {
    AcUnit,
    AccountCircle,
    Category,
    ContactPhone,
    InfoOutlined,
    KeyboardDoubleArrowLeft,
    Person,
    ProductionQuantityLimits,
    Rule,
} from "@mui/icons-material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import RuleIcon from "@mui/icons-material/Rule";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/Icon/Asset 1.svg";
import "./SidBar.css";
const SidBar = ({
    drawerWidth,
    container,
    mobileOpen,
    handleDrawerToggle,

    setMobileOpen,
}) => {
    let { t, i18n } = useTranslation();
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType")
    );
    useEffect(() => {
        setAccountType(localStorage.getItem("accountType"));
    }, [localStorage.getItem("accountType")]);
    let drawer = useMemo(() => {
        return (
            <>
                <Toolbar
                    sx={{ display: "flex ", justifyContent: "center" }}
                    className=" !min-h-[120px]"
                >
                    {/* <img className=' max-h-[120px]  w-fit ' src={ImgLogo} alt="img-logo" /> */}
                    <span className=" w-full  h-full flex text-center  justify-center items-stretch ">
                        {/* <img
                            className=" max-h-[100px]  w-fit object-contain "
                            src="../../assets/Img/Asset.png"
                            alt="img-logo"
                        /> */}
                        <div className=" max-h-[100px] max-w-[100px] h-full   w-full object-cover ">
                            <LogoSvg className=" max-h-[100px] max-w-[100px]" />
                        </div>
                    </span>
                    <Typography
                        variant="body1"
                        color="initial"
                        sx={{ display: { sm: "none" } }}
                        className=" !absolute top-5 right-0 "
                        component={"div"}
                    >
                        <IconButton
                            variant="contained"
                            color="primary"
                            className=" "
                            onClick={(e) => {
                                setMobileOpen(false);
                            }}
                        >
                            <KeyboardDoubleArrowLeft sx={{ color: "#fff" }} />
                        </IconButton>
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {/* =========================Dashboard======================== */}
                    <ListItem disablePadding>
                        <NavLink
                            to={"/admin/"}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-full  text-decoration-none sidebar-list active"
                                    : "w-full   text-decoration-none sidebar-list"
                            }
                        >
                            <ListItemButton sx={{ color: "#fff" }}>
                                <ListItemIcon>
                                    <InboxIcon sx={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText
                                    className=" !capitalize !text-start"
                                    primary={t("sidBar.DashBoard")}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    {/* ========================categories================================ */}
                    {accountType == "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/categories"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Category sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.categories")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}

                    {/* ========================== Products============================= */}
                    {accountType == "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/product"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <ProductionQuantityLimits
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Products")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================== Coupons============================= */}
                    {accountType == "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/coupon"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <ConfirmationNumberIcon
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Coupons")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================== Delivery============================= */}
                    {accountType === "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/delivery"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <LocalShippingIcon
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Delivery")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================== Features============================= */}
                    {accountType === "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/features"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <FeaturedPlayListIcon
                                            sx={{ color: "#fff" }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Features")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}

                    {/* ========================== Terms and Conditions============================= */}
                    {accountType == "agency" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/termsandconditions"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Rule sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Terms&Conditions")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================profile================================ */}
                    <ListItem disablePadding>
                        <NavLink
                            to={"/admin/profile"}
                            className={({ isActive }) =>
                                isActive
                                    ? "w-full  text-decoration-none sidebar-list active"
                                    : "w-full   text-decoration-none sidebar-list"
                            }
                        >
                            <ListItemButton sx={{ color: "#fff" }}>
                                <ListItemIcon>
                                    <AccountCircle sx={{ color: "#fff" }} />
                                </ListItemIcon>
                                <ListItemText
                                    className=" !capitalize !text-start"
                                    primary={t("sidBar.profile")}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                    {/* ========================contact================================ */}
                    {accountType == "admin" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/contact"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <ContactPhone sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.contact")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================about================================ */}
                    {accountType == "admin" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/about"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <InfoOutlined sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.about")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================Users================================ */}
                    {accountType == "admin" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/users"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <Person sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.Users")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ========================ads================================ */}
                    {accountType == "admin" && (
                        <ListItem disablePadding>
                            <NavLink
                                to={"/admin/ads"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "w-full  text-decoration-none sidebar-list active"
                                        : "w-full   text-decoration-none sidebar-list"
                                }
                            >
                                <ListItemButton sx={{ color: "#fff" }}>
                                    <ListItemIcon>
                                        <AcUnit sx={{ color: "#fff" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className=" !capitalize !text-start"
                                        primary={t("sidBar.ads")}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    )}
                    {/* ======================================================== */}
                </List>
                {/* <Divider /> */}
            </>
        );
    }, [setMobileOpen, t, accountType]);

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                className="sidbar  "
            >
                {/*  drawer in responsive */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            paddingX: "15px",
                            paddingY: "50px",
                            width: drawerWidth,
                            backgroundColor: "#031d54",
                            right: i18n.language === "ar" && "0",
                            left: i18n.language === "ar" ? "auto" : "0",
                        },
                    }}
                >
                    {/* <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton variant="contained" color="primary" onClick={handleDrawerToggle}>
              <KeyboardDoubleArrowLeft sx={{ color: '#fff' }} />
            </IconButton>
          </Toolbar> */}
                    {drawer}
                </Drawer>
                {/*  drawer in dk */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            paddingX: "15px",
                            paddingY: "50px",
                            backgroundColor: "#031d54",
                            left: i18n.language === "ar" ? "auto" : "0",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default SidBar;
