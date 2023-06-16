import React, { useEffect, useMemo, useState } from "react";

import {
    AccountTreeOutlined,
    AutorenewOutlined,
    CalendarViewMonthOutlined,
    ChromeReaderModeOutlined,
    DesignServicesOutlined,
    GroupAdd,
    PaymentsOutlined,
    ProductionQuantityLimitsOutlined,
    SupportAgent,
    VerifiedOutlined,
} from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DashThunk } from "../../RTK/Thunk/DashThunk";
import CardBox from "../../components/CardBox/CardBox";

const Dashboard = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let { dashData } = useSelector((state) => state.DashReducer);
    const [dataBox, setDataBox] = useState([]);
    useEffect(() => {
        dispatch(DashThunk());
    }, [dispatch]);

    //   change data from object to array
    // let handleDataDashRef = useRef(true)
    // useEffect(() => {
    //     if (dashData !== null && handleDataDashRef.current) {
    //         let data = []
    //         for (let key in dashData) {
    //             if (dashData.hasOwnProperty(key)) {
    //                 data.push({ name: key, value: dashData[key] })
    //                 // setDataBox([...dataBox, { name: key, value: dashData[key] }])
    //             }
    //         }
    //         handleDataDashRef.current = false;
    //         setDataBox(data)

    //     }
    // }, [dashData, dataBox]);
    // ==================
    const getCartBox = useMemo(() => {
        if (localStorage.getItem("accountType") == "agency") {
            return (
                <Grid container spacing={6}>
                    <CardBox
                        title={t("pages.DashBoard.names.productsCount")}
                        number={
                            dashData !== null ? dashData?.productsCount : null
                        }
                        Icon={
                            <ProductionQuantityLimitsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/product`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.unreadMessagesCount")}
                        number={
                            dashData !== null
                                ? dashData?.unreadMessagesCount
                                : null
                        }
                        Icon={
                            <DesignServicesOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/services`}
                    />
                    <CardBox
                        title={t(
                            "pages.DashBoard.names.unreadNotificationsCount"
                        )}
                        number={
                            dashData !== null
                                ? dashData?.unreadNotificationsCount
                                : null
                        }
                        Icon={
                            <AccountTreeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.allOrdersCount")}
                        number={
                            dashData !== null ? dashData?.allOrdersCount : null
                        }
                        Icon={
                            <AutorenewOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.pendingOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.pendingOrdersCount
                                : null
                        }
                        Icon={
                            <VerifiedOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/project`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.approvedOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.approvedOrdersCount
                                : null
                        }
                        Icon={
                            <PaymentsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.canceledOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.canceledOrdersCount
                                : null
                        }
                        Icon={
                            <ChromeReaderModeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.categoriesCount")}
                        number={
                            dashData !== null ? dashData?.categoriesCount : null
                        }
                        Icon={
                            <CalendarViewMonthOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                </Grid>
            );
        } else if (localStorage.getItem("accountType") == "admin") {
            return (
                <Grid container spacing={6}>
                    <CardBox
                        title={t("pages.DashBoard.names.productsCount")}
                        number={
                            dashData !== null ? dashData?.productsCount : null
                        }
                        Icon={
                            <ProductionQuantityLimitsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={`/admin/product`}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.unreadMessagesCount")}
                        number={
                            dashData !== null
                                ? dashData?.unreadMessagesCount
                                : null
                        }
                        Icon={
                            <DesignServicesOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t(
                            "pages.DashBoard.names.unreadNotificationsCount"
                        )}
                        number={
                            dashData !== null
                                ? dashData?.unreadNotificationsCount
                                : null
                        }
                        Icon={
                            <AccountTreeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.allOrdersCount")}
                        number={
                            dashData !== null ? dashData?.allOrdersCount : null
                        }
                        Icon={
                            <AutorenewOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.pendingOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.pendingOrdersCount
                                : null
                        }
                        Icon={
                            <VerifiedOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.approvedOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.approvedOrdersCount
                                : null
                        }
                        Icon={
                            <PaymentsOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.canceledOrdersCount")}
                        number={
                            dashData !== null
                                ? dashData?.canceledOrdersCount
                                : null
                        }
                        Icon={
                            <ChromeReaderModeOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.categoriesCount")}
                        number={
                            dashData !== null ? dashData?.categoriesCount : null
                        }
                        Icon={
                            <CalendarViewMonthOutlined className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.clientsCount")}
                        number={
                            dashData !== null ? dashData?.clientsCount : null
                        }
                        Icon={
                            <GroupAdd className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                    <CardBox
                        title={t("pages.DashBoard.names.agenciesCount")}
                        number={
                            dashData !== null ? dashData?.agenciesCount : null
                        }
                        Icon={
                            <SupportAgent className=" text-[#0644c6] !text-[32px]  " />
                        }
                        path={``}
                    />
                </Grid>
            );
        }
    }, [dashData, t]);
    // const data = {
    //     "unreadMessagesCount": 31,
    //     "unreadNotificationsCount": 5,
    //     "allOrdersCount": 43,
    //     "pendingOrdersCount": 18,
    //     "approvedOrdersCount": 12,
    //     "canceledOrdersCount": 13,
    //     "categoriesCount": 1,
    //     "productsCount": 43
    // };

    // for (let key in data) {
    //     if (data.hasOwnProperty(key)) {

    //         console.log(key + ": " + data[key]);
    //     }
    // }
    return (
        <>
            <Container className="!mt-[40px] !mb-[100px]">
                {getCartBox}
            </Container>
        </>
    );
};

export default Dashboard;
