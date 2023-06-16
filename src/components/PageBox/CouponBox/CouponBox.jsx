import React, { useEffect, useState } from "react";

import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllCouponThunk } from "../../../RTK/Thunk/AllCouponThunk";
import { DeleteCouponThunk } from "../../../RTK/Thunk/DeleteCouponThunk";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";
import { AlertDialog, PaginationBox } from "../../index.js";
import "./CouponBox.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const CouponBox = () => {
    let navigate = useNavigate();
    let { t, i18n } = useTranslation();

    let dispatch = useDispatch();
    const [pageTarget, setPageTarget] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [openAlert, setOpenAlert] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    let { lastPage, couponData } = useSelector((state) => state.CouponReducer);
    useEffect(() => {
        if (searchValue) {
            dispatch(AllCouponThunk({ page: pageTarget, search: searchValue }));
        } else {
            dispatch(AllCouponThunk({ page: pageTarget, search: "" }));
        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);

    let handleDelete = (id) => {
        dispatch(
            DeleteCouponThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AllCouponThunk({ page: pageTarget, search: "" }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    // ===================================
    const [openAlertFn, setOpenAlertFn] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    let { typeAlert } = useSelector((state) => state.MessageReducer);
    useEffect(() => {
        if (typeAlert) {
            setMessage(t("code_error.The_Data_Has_Been_Updated"));
            setOpenAlertFn(true);
        }
    }, [typeAlert, t]);
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className="flex  items-start md:items-center justify-between flex-col md:flex-row mb-3  gap-5 ">
                    <div className="flex  items-end gap-2 pl-1">
                        <h6 className=" capitalize text-[22px]  font-medium	">
                            {t("pages.BrandBox.search")} :
                        </h6>
                        <input
                            type="text"
                            className=" bg-secondaryBg outline-none p-[8px]"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            navigate("/admin/coupon/add");
                        }}
                    >
                        {t("pages.ProductBox.Add_a_new")}
                    </Button>
                </div>
                {couponData.length ? (
                    <TableContainer component={Paper} sx={{ height: "438px" }}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ProductBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ProductBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ProductBox.table.Percentage")}
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.ProductBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {couponData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row?.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row?.percentage}
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/coupon/edit/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        // handleDelete(row.id);
                                                        setOpenAlert(true);
                                                        setDeleteId(row.id);
                                                    }}
                                                >
                                                    <DeleteForever />
                                                </IconButton>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null}
            </div>
            <AlertDialog
                open={openAlert}
                setOpen={setOpenAlert}
                handleDelete={handleDelete}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
            />
            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
            <UpdateDataFn
                openAlert={openAlertFn}
                setOpenAlert={setOpenAlertFn}
                Data={Message}
            />
        </>
    );
};

export default CouponBox;
