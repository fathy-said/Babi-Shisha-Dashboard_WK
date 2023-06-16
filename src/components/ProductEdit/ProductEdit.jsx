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
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
import {
    DataView,
    closeError,
    closeSelect,
} from "../../RTK/Reducers/ProductReducer";
import { AllFeaturesThunk } from "../../RTK/Thunk/AllFeaturesThunk";
import { OneProductThunk } from "../../RTK/Thunk/OneProductThunk";
import { SelectParentCategoriesThunk } from "../../RTK/Thunk/SelectParentCategoriesThunk";
import { UpdateProductThunk } from "../../RTK/Thunk/UpdateProductThunk";
import { UploadImgThunk } from "../../RTK/Thunk/uploadImgThunk";
import img from "../../assets/Img/default.jpg";
import SelectBox from "../SelectBox/SelectBox";
import "./ProductEdit.css";

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

const ProductEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();

    let navigate = useNavigate();
    const [images, setImages] = React.useState([]);
    const [imgeDataTarget, setImgeDataTarget] = useState([]);
    const [imageMain, setImageMain] = React.useState([{ data_url: img }]);
    const [imgeTargetAction, setImgeTargetAction] = useState({
        index: "",
        type: "",
    });

    const [inputValue, setInputValue] = useState({
        category_Name_en: "",
        desc_en: "",
        price: "",
        total: "",
    });

    const [selectIndex, setSelectIndex] = React.useState({
        categories: "",
    });
    const [selectCategoriesTarget, setSelectCategoriesTarget] =
        React.useState("");
    let {
        oneImgData,
        oneDataProduct,
        categoriesSelectData,
        oneFeatures,
        oneMainImg,
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
    // =================Select Menu=======================
    const [personName, setPersonName] = React.useState([]);
    // console.log(personName);
    const handleChange = (event) => {
        // console.log(event);
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
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
    //  get data one one loading
    const OneRef = useRef(true);
    useEffect(() => {
        if (oneDataProduct == "" && OneRef.current) {
            dispatch(OneProductThunk({ id: param.productEdit }));
            OneRef.current = false;
        }
    }, [dispatch, param.productEdit, oneDataProduct]);
    // =====data===========
    // handle select on loading
    useEffect(() => {
        if (selectCategoriesTarget == "" && categoriesSelectData.length) {
            if (oneDataProduct?.categoryId) {
                let data = categoriesSelectData.findIndex(
                    (el) => el.id == oneDataProduct?.categoryId
                );

                setSelectIndex({ categories: data });
                setSelectCategoriesTarget(categoriesSelectData[data]?.id);
            }
        }
    }, [
        categoriesSelectData,
        oneDataProduct?.categoryId,
        selectCategoriesTarget,
    ]);
    // handle input on loading
    useEffect(() => {
        if (oneDataProduct !== null) {
            setInputValue({
                category_Name_en: oneDataProduct.name,
                desc_en: oneDataProduct.description,
                price: oneDataProduct.price,
                total: oneDataProduct.quantity,
            });
        }
    }, [oneDataProduct]);
    // handle Features on loading
    const selectFeaturesRef = useRef(true);
    useEffect(() => {
        if (
            oneFeatures.length &&
            !personName.length &&
            selectFeaturesRef.current
        ) {
            let data = [];
            oneFeatures.forEach((el) => {
                data.push(el.name);
                setPersonName([...personName, el.name]);
            });
            setPersonName([...data]);
            selectFeaturesRef.current = false;
        }
    }, [oneFeatures, personName]);
    // console.log(personName);

    /// handle img all
    const onChange = (imageList, addUpdateIndex) => {
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
                    // getRes.splice(imgeTargetAction.index, 1, res.data[0]);
                    getRes[imgeTargetAction.index] = res.data[0];
                    setImgeDataTarget(getRes);
                    // //  console.log(getRes)
                    setImgeTargetAction({
                        index: "",
                        type: "",
                    });
                })
                .catch((error) => {
                    // handle error here
                });
        }
        setImages(imageList);
    };
    const RefImg = useRef(true);
    useEffect(() => {
        if (oneImgData.length && images.length < 1 && RefImg.current) {
            let dataGet = [...oneImgData];
            let data = [];
            for (let index = 0; index < oneImgData.length; index++) {
                data.push("");
            }
            setImgeDataTarget(data);

            let dataString = ImageToString(oneImgData);

            dataGet = dataGet.map((el, index) => {
                return {
                    data_url: el,
                    key: dataString[index],
                };
            });
            setImages(dataGet);
            RefImg.current = false;
        }
    }, [oneImgData, images]);
    let ImageToString = (imagesFromApi) => {
        let index;
        let keptImages = [];
        for (index in imagesFromApi) {
            /*
            Split The Url Of Image Ang Get Only Image Name

            example: if Url Of Image is => http://api.abdjan/storage/default/default.png

            if will get only => default.png
        */

            let splitedImage = imagesFromApi[index].split("/");

            keptImages.push(splitedImage[splitedImage.length - 1] || null);
        }
        return keptImages;
    };
    useEffect(() => {
        if (imgeTargetAction.type == "remove") {
            let getRes = [...imgeDataTarget];
            getRes.splice(imgeTargetAction.index, 1);

            setImgeDataTarget(getRes);
            setImgeTargetAction({
                index: "",
                type: "",
            });
        }
    }, [imgeTargetAction, imgeDataTarget]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
            dispatch(DataView());
            dispatch(closeSelect());
        };
    }, []);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    let handleSubmit = (e) => {
        e.preventDefault();
        let handleKeepImg = () => {
            let data = [...images];
            data = data.map((el) => {
                if (el?.key) {
                    return el;
                }
            });
            data = data.filter((el) => el?.key);
            data = data.map((el) => {
                return el.key;
            });
            return data;
        };
        let handleImg = () => {
            let data = [...imgeDataTarget];
            data = data.filter((el) => el !== "");
            return data;
        };
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
            id: param.productEdit,
            category_id: selectCategoriesTarget,
            name: inputValue.category_Name_en,
            quantity: inputValue.total,
            features: featuresID,
            description: inputValue.desc_en,
            price: inputValue.price,
            // stored_images: imgeDataTarget,
            main_image: imageMain[0].file || null,
            // images: handleImg(),
            stored_images: handleImg(),
            keep_images: handleKeepImg(),
        };
        // console.log(data);
        dispatch(UpdateProductThunk(data))
            .unwrap()
            .then((data) => {
                // //  console.log(data);
                dispatch(openMessageAlert());
                navigate("/admin/product");
            })
            .catch((error) => {
                // //  console.log(error);
                //    setCode(error.code);
            });
    };
    // === handle maine img===
    const onChangeMainImg = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImageMain(imageList);
    };
    useEffect(() => {
        if (oneMainImg) {
            // console.log(oneImg);
            setImageMain([{ data_url: oneMainImg }]);
        }
    }, [oneMainImg]);
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
                                    selectIndex={selectIndex.categories}
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

export default React.memo(ProductEdit);
