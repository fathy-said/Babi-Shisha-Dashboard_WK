import { DeleteForever } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
import { closeError, closeSelect } from "../../RTK/Reducers/ProductReducer";
import { AddProductThunk } from "../../RTK/Thunk/AddProductThunk";
import { AllFeaturesThunk } from "../../RTK/Thunk/AllFeaturesThunk";
import { SelectParentCategoriesThunk } from "../../RTK/Thunk/SelectParentCategoriesThunk";
import { UploadImgThunk } from "../../RTK/Thunk/uploadImgThunk";
import img from "../../assets/Img/default.jpg";
import SelectBox from "../SelectBox/SelectBox";
import "./ProductNew.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            maxWidth: "100%",
        },
    },
};

const names = [
    {
        id: 10,
        name: "Elliott Goldner",
    },
    {
        id: 9,
        name: "Dr. Sid Kozey PhD",
    },
    {
        id: 8,
        name: "Prof. Jamison Jacobson",
    },
    {
        id: 7,
        name: "Prof. Levi Reichel",
    },
    {
        id: 6,
        name: "Waylon Stark MD",
    },
    {
        id: 5,
        name: "Dora Durgan",
    },
    {
        id: 4,
        name: "Joanne Zieme",
    },
    {
        id: 3,
        name: "Maybelle Marquardt",
    },
    {
        id: 2,
        name: "Prof. Gerson Miller",
    },
    {
        id: 1,
        name: "Cierra Stark",
    },
];

const ProductNew = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [images, setImages] = React.useState([]);
    const [imageMain, setImageMain] = React.useState([{ data_url: img }]);

    const [imgeDataTarget, setImgeDataTarget] = useState([]);
    const [selectCategoriesTarget, setSelectCategoriesTarget] =
        React.useState("");
    const [inputValue, setInputValue] = useState({
        category_Name_en: "",
        desc_en: "",
        price: "",
        total: "",
    });
    const [imgeTargetAction, setImgeTargetAction] = useState({
        index: "",
        type: "",
    });
    let {
        categoriesSelectData,
        productData,
        featuresData,
        price_Error,
        features_Error,
        quantity_Error,
        category_id_Error,
        images_Error,
        MainImg_Error,
        name_Error_en,
        desc_Error_en,
    } = useSelector((state) => state.ProductReducer);

    // =====data=select-category==========
    useEffect(() => {
        if (!categoriesSelectData.length) {
            dispatch(SelectParentCategoriesThunk());
        }
    }, [dispatch, categoriesSelectData.length]);
    // =====data=select-featuresData==========

    useEffect(() => {
        if (!featuresData.length) {
            dispatch(AllFeaturesThunk());
        }
    }, [dispatch, featuresData.length]);
    // handle select on loading
    useEffect(() => {
        if (selectCategoriesTarget == "" && categoriesSelectData.length) {
            setSelectCategoriesTarget(categoriesSelectData[0]?.id);
        }
    }, [categoriesSelectData, selectCategoriesTarget, dispatch]);
    /// handle img all
    const onChange = (imageList, addUpdateIndex) => {
        // //  console.log(addUpdateIndex)
        // //  console.log(imageList[addUpdateIndex]?.file);
        if (imgeTargetAction.type == "upload") {
            dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
                .unwrap()
                .then((res) => {
                    // //  console.log(res.data[0]);
                    let getRes = [...imgeDataTarget];
                    getRes.push(res.data[0]);
                    // //  console.log(getRes)
                    setImgeDataTarget(getRes);
                    setImgeTargetAction({
                        index: "",
                        type: "",
                    });
                })
                .catch((error) => {
                    // //  console.log(error);
                    // handle error here
                });
        }
        if (imgeTargetAction.type == "update") {
            dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
                .unwrap()
                .then((res) => {
                    let getRes = [...imgeDataTarget];
                    //
                    getRes.splice(imgeTargetAction.index, 1, res.data[0]);
                    //  console.log(getRes);
                    setImgeDataTarget(getRes);
                    setImgeTargetAction({
                        index: "",
                        type: "",
                    });
                })
                .catch((error) => {
                    // //  console.log(error);
                    // handle error here
                });
        }
        setImages(imageList);
    };
    // useEffect(() => {
    //console.log(imgeDataTarget);
    // }, [imgeDataTarget]);
    // === handle maine img===
    const onChangeMainImg = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImageMain(imageList);
    };
    useEffect(() => {
        if (imgeTargetAction.type == "remove") {
            // //  console.log(imgeDataTarget)
            let getRes = imgeDataTarget.filter(
                (el) => el !== imgeDataTarget[imgeTargetAction.index]
            );
            // //  console.log(getRes)
            setImgeDataTarget(getRes);
            //  console.log(getRes);
            setImgeTargetAction({
                index: "",
                type: "",
            });
        }
    }, [imgeTargetAction, imgeDataTarget]);
    // =================Select Menu=======================
    const [personName, setPersonName] = React.useState([]);
    // console.log(personName);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    // useEffect(() => {
    //     if (personName.length) {
    //         console.log(personName.length);
    //         console.log(personName[personName.length - 1]);
    //     }
    // }, [personName]);
    //  handle submit form
    //

    let handleSubmit = (e) => {
        e.preventDefault();
        let featuresID = [];
        for (let index = 0; index < personName.length; index++) {
            // console.log(personName[index]);

            featuresData.forEach((el) => {
                if (el.name == personName[index]) {
                    featuresID.push(el.id);
                }
            });
        }
        let data = {
            name: inputValue.category_Name_en,
            quantity: inputValue.total,
            features: featuresID,
            description: inputValue.desc_en,
            price: inputValue.price,
            category_id: selectCategoriesTarget,
            stored_images: imgeDataTarget,
            // main_image: imageMain[0],
            main_image:
                imageMain[0].data_url !== img ? imageMain[0].file : null,
        };
        // console.log(data);

        dispatch(AddProductThunk(data))
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());
                // navigate("/admin/product");
            })
            .catch((error) => {
                console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        return () => {
            dispatch(closeError());
            dispatch(closeSelect());
        };
    }, []);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);

    return (
        <>
            <>
                <div className="p-[20px] mt-[40px]">
                    <form
                        action=""
                        className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-center flex-wrap flex-col lg:flex-row lg:justify-start lg:items-start items-center w-full   gap-[30px] h-full">
                            <>
                                <div className=" min-w-[230px] w-full flex-1 ">
                                    <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                        {t(
                                            "pages.ProductNew.Sub_category_Name"
                                        )}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue.category_Name_en}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                category_Name_en:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                    {name_Error_en !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                marginTop: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {name_Error_en}
                                        </span>
                                    )}
                                </div>
                            </>

                            <FormControl
                                className="min-h-[75.5px]   !min-w-[230px] flex-1 w-full"
                                onClick={(e) => {
                                    // //  console.log(e.target.textContent)
                                    if (
                                        e.target.tagName == "LI" &&
                                        categoriesSelectData.length
                                    ) {
                                        // //  console.log(e.target.textContent);

                                        let data = categoriesSelectData.filter(
                                            (el) =>
                                                el.name === e.target.textContent
                                        );

                                        setSelectCategoriesTarget(data[0].id);
                                    }
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Categories")}
                                </h6>
                                <SelectBox
                                    TargetData={categoriesSelectData || []}
                                />
                                {category_id_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {category_id_Error}
                                    </span>
                                )}
                            </FormControl>
                            <div className="  min-w-[230px] w-full flex-1">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Unit_Price")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue.price}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            price: e.target.value,
                                        });
                                    }}
                                />
                                {price_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {price_Error}
                                    </span>
                                )}{" "}
                            </div>
                        </div>
                        <div className="flex mt-[40px] justify-center flex-wrap flex-col lg:flex-row lg:justify-start lg:items-start items-center w-full   gap-[30px] h-full">
                            <div className="min-w-[230px] w-full flex-1">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Total_Quantity")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue.total}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            total: e.target.value,
                                        });
                                    }}
                                />
                                {quantity_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {quantity_Error}
                                    </span>
                                )}{" "}
                            </div>
                            <FormControl className=" !min-h-[75.5px]   !min-w-[230px] !flex-1 !w-full">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.features")}
                                </h6>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    className="select-box "
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {featuresData.map((name) => (
                                        <MenuItem
                                            key={name.id}
                                            value={name.name}
                                        >
                                            <Checkbox
                                                checked={
                                                    personName.indexOf(
                                                        name.name
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={name.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {features_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {features_Error}
                                    </span>
                                )}{" "}
                            </FormControl>
                            <div className=" min-w-[230px] w-full flex-1">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Description")}
                                </h6>
                                <textarea
                                    className=" min-h-[150px]"
                                    value={inputValue.desc_en}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            desc_en: e.target.value,
                                        });
                                    }}
                                ></textarea>
                                {desc_Error_en !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {desc_Error_en}
                                    </span>
                                )}{" "}
                            </div>
                        </div>
                        <hr className=" w-full my-[40px]" />
                        <div className=" max-[1040px]:flex-col flex justify-center items-start  w-full gap-[40px] ">
                            <div className=" w-full relative flex-1 bg-[#f6f6f6] p-[20px]">
                                <>
                                    <ImageUploading
                                        multiple
                                        value={imageMain}
                                        onChange={onChangeMainImg}
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
                                                {imageList.map(
                                                    (image, index) => (
                                                        <div
                                                            key={index}
                                                            className=" flex flex-col justify-end gap-[40px]  items-end"
                                                        >
                                                            <div className=" w-full  flex  justify-between  gap-[12px] flex-wrap items-center">
                                                                <h6 className="mb-[10px] text-[18px] font-[500] capitalize  ">
                                                                    {t(
                                                                        "pages.ProductNew.main_image"
                                                                    )}
                                                                </h6>
                                                                <Button
                                                                    variant="contained"
                                                                    className=" !bg-primaryBg w-[150px] h-[50px] "
                                                                    onClick={() => {
                                                                        onImageUpdate(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    {t(
                                                                        "pages.ProductNew.ADD_Image"
                                                                    )}
                                                                </Button>
                                                            </div>
                                                            <div className="image-item  w-full max-h-[300px]">
                                                                <img
                                                                    src={
                                                                        image[
                                                                            "data_url"
                                                                        ]
                                                                    }
                                                                    className=" object-cover w-full max-h-[300px]"
                                                                    alt=""
                                                                    {...dragProps}
                                                                    style={
                                                                        isDragging
                                                                            ? {
                                                                                  border: "4px dashed #1da231",
                                                                              }
                                                                            : undefined
                                                                    }
                                                                    onClick={() =>
                                                                        onImageUpdate(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </ImageUploading>
                                    {MainImg_Error !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                marginTop: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {MainImg_Error}
                                        </span>
                                    )}
                                </>
                            </div>
                            <div className=" w-full relative flex-1  bg-[#f6f6f6] p-[20px]">
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={"1000"}
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
                                        <div className=" flex flex-col justify-end gap-[40px]  items-end">
                                            <div className=" w-full  flex  justify-between  gap-[12px] flex-wrap items-center">
                                                <h6 className=" text-[18px] mb-3 font-[500] capitalize  ">
                                                    {t(
                                                        "pages.ProductNew.other_images"
                                                    )}
                                                </h6>
                                                <Button
                                                    variant="contained"
                                                    className=" !bg-primaryBg w-[150px] h-[50px] "
                                                    onClick={() => {
                                                        setImgeTargetAction({
                                                            index: "",
                                                            type: "upload",
                                                        });
                                                        onImageUpload();
                                                    }}
                                                >
                                                    {t(
                                                        "pages.ProductNew.ADD_Image"
                                                    )}
                                                </Button>
                                            </div>
                                            <div className=" w-full flex flex-wrap gap-[30px] justify-center  items-start">
                                                {imageList.length ? (
                                                    imageList.map(
                                                        (image, index) => (
                                                            <div
                                                                key={index}
                                                                className="image-item  w-full max-w-[300px] min-w-[200px] border p-3 border-primaryBg  relative "
                                                            >
                                                                <div className=" flex justify-between gap-5 items-center mb-3 ">
                                                                    <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                                                        {index +
                                                                            1}
                                                                    </h6>
                                                                    <IconButton
                                                                        aria-label=""
                                                                        onClick={() => {
                                                                            onImageRemove(
                                                                                index
                                                                            );
                                                                            setImgeTargetAction(
                                                                                {
                                                                                    index: index,
                                                                                    type: "remove",
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <DeleteForever />
                                                                    </IconButton>
                                                                </div>
                                                                <img
                                                                    src={
                                                                        image[
                                                                            "data_url"
                                                                        ]
                                                                    }
                                                                    className="   w-full cursor-pointer object-cover !aspect-square"
                                                                    alt=""
                                                                    width="100"
                                                                    onClick={() => {
                                                                        onImageUpdate(
                                                                            index
                                                                        );
                                                                        setImgeTargetAction(
                                                                            {
                                                                                index: index,
                                                                                type: "update",
                                                                            }
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="image-item  w-full max-h-[300px]">
                                                        <img
                                                            src={img}
                                                            className=" object-cover w-full max-h-[300px]"
                                                            alt=""
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                                {MainImg_Error !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginBottom: "15px",
                                            marginTop: "15px",
                                            display: "block",
                                        }}
                                    >
                                        {images_Error}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* ======================== */}
                        <hr className=" w-full my-[40px]" />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                        >
                            {t("pages.ProductNew.Submit")}
                        </Button>
                    </form>
                </div>
            </>
        </>
    );
};

export default ProductNew;
