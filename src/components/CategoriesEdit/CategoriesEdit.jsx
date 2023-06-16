import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeError } from "../../RTK/Reducers/CategoriesReducer";
import { OneCategoriesThunk } from "../../RTK/Thunk/OneCategoriesThunk";
import { UpdateCategoriesThunk } from "../../RTK/Thunk/UpdateCategoriesThunk";
import img from "../../assets/Img/default.jpg";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";

const CategoriesEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();
    let navigate = useNavigate();
    const [images, setImages] = React.useState([{ data_url: img }]);
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
    });
    let { name_en_Error, avatarError, categoriesName, categoriesImg } =
        useSelector((state) => state.CategoriesReducer);
    //handle get data
    const getDataRef = useRef(true);
    useEffect(() => {
        if (getDataRef.current) {
            dispatch(OneCategoriesThunk({ id: param.editCategories }));
            getDataRef.current = false;
        }
    }, [dispatch, param.editCategories]);

    // handle on loading data
    useEffect(() => {
        if (categoriesName) {
            setInputValue({
                input_en: categoriesName,
            });
        }
    }, [categoriesName]);
    useEffect(() => {
        if (categoriesImg) {
            // console.log(oneImg);
            setImages([{ data_url: categoriesImg }]);
        }
    }, [categoriesImg]);

    // handle error input
    // =====en=======
    useEffect(() => {
        if (inputValue.input_en) {
            dispatch(closeError({ type: "en" }));
        }
    }, [inputValue.input_en, dispatch]);
    useEffect(() => {
        return () => {
            dispatch(closeError({ type: "all" }));
        };
    }, [dispatch]);
    //handle  update
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateCategoriesThunk({
                id: param.editCategories,
                name: inputValue?.input_en,
                image: images[0].file || null,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                setImages([{ data_url: img }]);
                navigate("/admin/categories/");
            })
            .catch((error) => {
                // console.log(error);
                // setCode(error.code);
                // handle error here
            });
    };
    // img fun handle
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className="flex justify-center flex-col lg:flex-row items-center w-full  gap-5 h-full">
                        <div className=" w-full mb-3">
                            <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                {t("pages.CategoriesEdit.add.name")}
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
                                                        "pages.CategoriesEdit.add.Images"
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
                        {t("pages.CategoriesEdit.add.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CategoriesEdit;
