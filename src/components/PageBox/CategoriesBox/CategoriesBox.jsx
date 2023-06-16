import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeError } from "../../../RTK/Reducers/CategoriesReducer";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";
import { AddCategoriesThunk } from "../../../RTK/Thunk/AddCategoriesThunk";
import { AllCategoriesThunk } from "../../../RTK/Thunk/AllCategoriesThunk";
import { DeleteCategoriesThunk } from "../../../RTK/Thunk/DeleteCategoriesThunk";
import img from "../../../assets/Img/default.jpg";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";
import { AlertDialog, PaginationBox } from "../../index.js";
import "./CategoriesBox.css";

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
const CategoriesBox = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    const [pageTarget, setPageTarget] = useState(1);
    const [images, setImages] = React.useState([{ data_url: img }]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const [searchValue, setSearchValue] = useState("");
    let {
        categoriesData,
        lastPage,
        avatarError,
        name_en_Error,
        name_ar_Error,
        name_fr_Error,
    } = useSelector((state) => state.CategoriesReducer);
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
    });
    useEffect(() => {
        if (searchValue) {
            dispatch(
                AllCategoriesThunk({ page: pageTarget, search: searchValue })
            );
        } else {
            dispatch(AllCategoriesThunk({ page: pageTarget, search: "" }));
        }
    }, [dispatch, pageTarget, i18n.language, searchValue]);
    //  handle add table
    const [openAlertFn, setOpenAlertFn] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    let { typeAlert } = useSelector((state) => state.MessageReducer);
    useEffect(() => {
        if (typeAlert) {
            setMessage(t("code_error.The_Data_Has_Been_Updated"));
            setOpenAlertFn(true);
        }
    }, [typeAlert, t]);
    // remove error message
    useEffect(() => {
        if (images[0].data_url !== img) {
            dispatch(closeError({ type: "img" }));
        }
    }, [images, dispatch]);
    // handle error input
    // =====en=======
    useEffect(() => {
        if (inputValue.input_en) {
            // dispatch(closeError({ type: "en" }));
        }
    }, [inputValue.input_en, dispatch]);
    // handle submit
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            AddCategoriesThunk({
                // id: nameBrand?.id,
                name: inputValue?.input_en,
                image: images[0].file,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log("said");
                dispatch(openMessageAlert());
                setInputValue({
                    input_en: "",
                });
                setImages([{ data_url: img }]);
                dispatch(
                    AllCategoriesThunk({
                        page: pageTarget,
                        search: "",
                    })
                );
            })
            .catch((error) => {
                // console.log(error);
                // setCode(error.code);
                // handle error here
            });
    };
    // handle Delete Category
    let handleDeleteCategories = (id) => {
        dispatch(
            DeleteCategoriesThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AllCategoriesThunk({ page: pageTarget, search: "" }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    // img fun handle
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px] mb-[160px] ">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className="flex justify-center flex-col lg:flex-row items-center w-full  gap-5 h-full">
                        <div className=" w-full mb-3">
                            <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                {t("pages.CategoriesBox.add.name")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue?.input_en}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        input_en: e.target.value,
                                    });
                                }}
                            />
                            {name_en_Error !== null && (
                                <span
                                    style={{
                                        width: "100%",
                                        color: "red",
                                        fontSize: "15px",
                                        marginTop: "20px",
                                        display: "block",
                                    }}
                                >
                                    {name_en_Error}
                                </span>
                            )}
                        </div>
                        <>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={"1"}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <>
                                        {imageList.map((image, index) => (
                                            <div
                                                key={index}
                                                className="image-item  w-full flex flex-col  items-start "
                                            >
                                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                                    {t(
                                                        "pages.CategoriesBox.add.Images"
                                                    )}
                                                </h6>
                                                <img
                                                    src={image["data_url"]}
                                                    className="  min-w-[200px] w-full max-w-[500px] max-h-[280px]  rounded-[6px] sm:w-full cursor-pointer object-cover"
                                                    alt=""
                                                    {...dragProps}
                                                    style={
                                                        isDragging
                                                            ? {
                                                                  border: "4px dashed #1da231",
                                                              }
                                                            : undefined
                                                    }
                                                    width="100"
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                />
                                                {avatarError !== null && (
                                                    <span
                                                        style={{
                                                            width: "100%",
                                                            color: "red",
                                                            fontSize: "15px",
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        {avatarError}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </ImageUploading>
                        </>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-5 !ml-auto"
                    >
                        {t("pages.CategoriesBox.add.Submit")}
                    </Button>
                </form>
                <div className=" w-full flex justify-start  items-end my-[20px]">
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
                </div>
                {categoriesData.length && (
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
                                        {t("pages.CategoriesBox.table.id")}
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.CategoriesBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.CategoriesBox.table.Img")}
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.CategoriesBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categoriesData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Avatar
                                                alt="Travis Howard"
                                                className=" mx-auto"
                                                src={row.image}
                                            />
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    id="basic-button"
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/categories/edit/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        // handleDeleteCategories(
                                                        //   row.id
                                                        // );
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
                )}
                <AlertDialog
                    open={openAlert}
                    setOpen={setOpenAlert}
                    handleDelete={handleDeleteCategories}
                    deleteId={deleteId}
                    setDeleteId={setDeleteId}
                />

                <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
                <UpdateDataFn
                    openAlert={openAlertFn}
                    setOpenAlert={setOpenAlertFn}
                    Data={Message}
                />
            </div>
        </>
    );
};

export default React.memo(CategoriesBox);
