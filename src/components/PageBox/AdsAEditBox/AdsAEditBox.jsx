import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeError } from "../../../RTK/Reducers/AdsReducer";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";
import { OneAdsThunk } from "../../../RTK/Thunk/OneAdsThunk";
import { UpdateAdsThunk } from "../../../RTK/Thunk/UpdateAdsThunk";
import img from "../../../assets/Img/default.jpg";
import "./AdsAEditBox.css";
const AdsAEditBox = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = useState({
        name_en: "",
        discount: "",
        company_name: "",
    });
    const [images, setImages] = React.useState([{ data_url: img }]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    let {
        oneImg,
        nameError_en,
        avatarError,
        discountError,
        oneAds,
        company_name_err,
    } = useSelector((state) => state.AdsReducer);
    //handle input language
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (i18n.language === "en") {
            setValue(0);
        }
        if (i18n.language === "ar") {
            setValue(1);
        }
        if (i18n.language === "fr") {
            setValue(2);
        }
    }, [i18n.language]);

    // ============= handle get data user================
    // console.log(!!oneAds);
    useEffect(() => {
        if (param.editAds) {
            dispatch(OneAdsThunk({ id: param.editAds }));
        }
    }, [dispatch, param.editAds]);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    // handle input value
    useEffect(() => {
        if (oneAds) {
            setInputValue({
                discount: oneAds?.discount,
                name_en: oneAds?.title,
                company_name: oneAds?.company_name,
            });
        }
    }, [oneAds]);
    useEffect(() => {
        if (oneImg) {
            setImages([{ data_url: oneImg }]);
        }
    }, [oneImg]);

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateAdsThunk({
                name: inputValue.name_en,
                company_name: inputValue.company_name,
                discount: inputValue.discount,
                img: images[0].data_url === img ? null : images[0].file || null,
                id: param.editAds,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                navigate("/admin/ads");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    return (
        <>
            <div className="p-[20px] my-[60px]">
                <div className="about-box add-box w-full flex justify-center add-shadow  items-center h-full py-[40px] px-[20px]">
                    <form
                        className="box  flex justify-start gap-[40px] items-center flex-col  w-full max-w-[750px]  h-full p-[20px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-start w-full items-start  mt-[40px] "></div>
                        <div className=" w-full">
                            <>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.Title")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
                                        value={inputValue?.name_en}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                name_en: e.target.value,
                                            });
                                        }}
                                    />{" "}
                                    {nameError_en !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError_en}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.company_name")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
                                        value={inputValue?.company_name}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                company_name: e.target.value,
                                            });
                                        }}
                                    />{" "}
                                    {company_name_err !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {company_name_err}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div className=" w-full">
                            <>
                                <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                                    <h6 className=" text-[17px] font-[500] capitalize  ">
                                        {t("pages.adsAdd.discount")}
                                    </h6>
                                    <input
                                        type="text"
                                        className=" "
                                        value={inputValue?.discount}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                discount: e.target.value,
                                            });
                                        }}
                                    />
                                    {discountError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginBottom: "15px",
                                                display: "block",
                                            }}
                                        >
                                            {discountError}
                                        </span>
                                    )}
                                </div>
                            </>
                        </div>
                        <div className="flex justify-start w-full items-start mb-5  flex-col gap-[15px]">
                            <h6 className=" text-[17px] font-[500] capitalize  ">
                                {t("pages.adsAdd.Image")}
                            </h6>
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
                                                <img
                                                    src={image["data_url"]}
                                                    key={index}
                                                    className=" max-h-[350px] mx-[auto] w-full cursor-pointer object-cover"
                                                    alt=""
                                                    {...dragProps}
                                                    style={
                                                        isDragging
                                                            ? {
                                                                  border: "4px dashed #000",
                                                              }
                                                            : undefined
                                                    }
                                                    width="100"
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                />
                                            ))}
                                        </>
                                    )}
                                </ImageUploading>
                            </>
                            {avatarError !== null && (
                                <span
                                    style={{
                                        width: "100%",
                                        color: "red",
                                        fontSize: "15px",
                                        marginBottom: "15px",
                                        display: "block",
                                    }}
                                >
                                    {avatarError}
                                </span>
                            )}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px] !ml-auto"
                        >
                            {t("pages.adsAdd.Submit")}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdsAEditBox;
