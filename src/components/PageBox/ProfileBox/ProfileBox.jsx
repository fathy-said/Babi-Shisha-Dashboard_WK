import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeError } from "../../../RTK/Reducers/ProfileReducer";
import { OneProfileThunk } from "../../../RTK/Thunk/OneProfileThunk";
import { UpdateProfileThunk } from "../../../RTK/Thunk/UpdateProfileThunk";
import img from "../../../assets/Img/default.jpg";
import "./ProfileBox.css";
import { UpdatePassThunk } from "../../../RTK/Thunk/UpdatePassThunk";
import UpdateDataFn from "../../UpdateDataFn/UpdateDataFn";
import { openMessageAlert } from "../../../RTK/Reducers/MessageReducer";

const ProfileBox = () => {
    let { t, i18n } = useTranslation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordBox, setShowPasswordBox] = React.useState(false);
    let {
        avatar,
        userData,
        nameError,
        addressError,
        phoneError,
        passwordError,
        avatarError,
        OldPasswordError,
    } = useSelector((state) => state.ProfileReducer);
    const [inputValue, setInputValue] = React.useState({
        input_name: "",
        input_phone: "",
        input_address: "",
        input_OldPass: "",
        input_pass: "",
        input_con_pass: "",
    });
    const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show);
    }, []);
    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, []);
    const [images, setImages] = React.useState([{ data_url: img }]);

    // useEffect(() => {
    //   setImages([{ data_url: editData.img }])
    // }, [editData.img]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        // images[0].file
        setImages(imageList);
    };
    // ============= handle get data user================
    const getOneDataRef = useRef(true);
    useEffect(() => {
        if (getOneDataRef.current) {
            dispatch(OneProfileThunk());
            getOneDataRef.current = false;
        }
    }, [dispatch]);
    // get data
    useEffect(() => {
        if (userData) {
            setInputValue({
                input_name: userData?.name,
                input_phone: userData?.phone,
                input_address: userData?.address,
                input_OldPass: "",
                input_pass: "",
                input_con_pass: "",
            });
        }
    }, [userData]);

    // handle img value on loading
    useEffect(() => {
        if (avatar) {
            // console.log(oneImg);
            setImages([{ data_url: avatar }]);
        }
    }, [avatar]);
    // handle submit
    useEffect(() => {
        dispatch(closeError());
        return () => {
            dispatch(closeError());
        };
    }, [inputValue, dispatch]);
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateProfileThunk({
                name: inputValue.input_name,
                phone: inputValue.input_phone,
                address: inputValue.input_address,
                avatar: images[0].file,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());
            })
            .catch((error) => {
                //    setCode(error.code);
            });
    };
    let handleSubmitPass = (e) => {
        e.preventDefault();
        dispatch(
            UpdatePassThunk({
                old_password: inputValue.input_OldPass,
                new_password: inputValue.input_pass,
                new_password_confirmation: inputValue.input_con_pass,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
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
        return () => {
            setOpenAlertFn(false);
        };
    }, [typeAlert, t]);
    return (
        <>
            <div className="p-[20px] mt-[60px]">
                {showPasswordBox ? (
                    <form
                        action=""
                        className="add-box flex  relative items-start justify-start flex-col px-5 pb-[60px] pt-[130px]  mb-[40px] add-shadow  "
                        onSubmit={handleSubmitPass}
                    >
                        <div className="  flex  w-full gap-[30px] justify-center items-center flex-col lg:flex-row">
                            <div className="  min-w-[250px]  gap-[20px] flex   flex-col justify-center items-center w-full lg:max-w-[500px]">
                                <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.Old_Password")}
                                    </h6>
                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        className="input-box"
                                    >
                                        <Input
                                            id="standard-adornment-password"
                                            className="input-pass"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="pass"
                                            value={inputValue?.input_OldPass}
                                            onChange={(e) => {
                                                setInputValue({
                                                    ...inputValue,
                                                    input_OldPass:
                                                        e.target.value,
                                                });
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        disableRipple
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {OldPasswordError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {OldPasswordError}
                                        </span>
                                    )}
                                </FormControl>
                                <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.New_Password")}
                                    </h6>
                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        className="input-box"
                                    >
                                        <Input
                                            id="standard-adornment-password"
                                            className="input-pass"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="pass"
                                            value={inputValue?.input_pass}
                                            onChange={(e) => {
                                                setInputValue({
                                                    ...inputValue,
                                                    input_pass: e.target.value,
                                                });
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        disableRipple
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {passwordError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {passwordError}
                                        </span>
                                    )}
                                </FormControl>
                                <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.Confirm_Password")}
                                    </h6>
                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        className="input-box"
                                    >
                                        <Input
                                            id="standard-adornment-password"
                                            className="input-pass"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={inputValue?.input_con_pass}
                                            onChange={(e) => {
                                                setInputValue({
                                                    ...inputValue,
                                                    input_con_pass:
                                                        e.target.value,
                                                });
                                            }}
                                            name="pass"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        disableRipple
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {passwordError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {passwordError}
                                        </span>
                                    )}
                                </FormControl>
                            </div>
                        </div>
                        <IconButton
                            aria-label=""
                            size="large"
                            className=" !bg-primaryBg !text-white !absolute !top-[30px] !left-[30px] "
                            onClick={() => setShowPasswordBox(false)}
                        >
                            <Clear />
                        </IconButton>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px]  !mt-[30px] !ml-auto"
                        >
                            {t("pages.Profile.Save_Change")}
                        </Button>
                    </form>
                ) : (
                    <form
                        action=""
                        className="add-box flex  relative items-start justify-start flex-col px-5 pb-[60px] pt-[130px]  mb-[40px] add-shadow  "
                        onSubmit={handleSubmit}
                    >
                        <div className=" flex   w-full gap-[30px] justify-center items-center flex-col lg:flex-row">
                            <div className=" min-w-[250px] gap-[10px] flex   flex-col justify-center items-center  w-full lg:max-w-[500px]">
                                <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.Full_Name")}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue?.input_name}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                input_name: e.target.value,
                                            });
                                        }}
                                    />
                                    {nameError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {nameError}
                                        </span>
                                    )}
                                </FormControl>
                                <FormControl className="min-h-[75.5px] !mt-[10px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.phone")}
                                    </h6>
                                    <input
                                        type="phone"
                                        value={inputValue?.input_phone}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                input_phone: e.target.value,
                                            });
                                        }}
                                    />{" "}
                                    {phoneError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {phoneError}
                                        </span>
                                    )}
                                </FormControl>
                                <FormControl className="min-h-[75.5px]  !mt-[10px] min-w-[250px] w-full lg:max-w-[500px]">
                                    <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                        {t("pages.Profile.address")}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue?.input_address}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                input_address: e.target.value,
                                            });
                                        }}
                                    />
                                    {addressError !== null && (
                                        <span
                                            style={{
                                                width: "100%",
                                                color: "red",
                                                fontSize: "15px",
                                                marginTop: "10px",
                                                display: "block",
                                            }}
                                        >
                                            {addressError}
                                        </span>
                                    )}
                                </FormControl>
                                <div className="min-w-[250px] w-full lg:max-w-[500px]">
                                    <Button
                                        variant="text"
                                        color="primary"
                                        className=" !capitalize !text-[17px] "
                                        onClick={() => {
                                            setShowPasswordBox(true);
                                        }}
                                    >
                                        Edit Password
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px]  !mt-[30px] !ml-auto"
                        >
                            {t("pages.Profile.Save_Change")}
                        </Button>
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
                                                className=" cursor-pointer bg-white w-[150px] img-shadow  h-[150px] absolute top-[-75px] left-[50%] translate-x-[-50%] rounded-full overflow-hidden"
                                                key={index}
                                            >
                                                <img
                                                    src={image["data_url"]}
                                                    className="w-full h-full object-cover"
                                                    alt=""
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </ImageUploading>
                        </>
                    </form>
                )}
            </div>
            <UpdateDataFn
                openAlert={openAlertFn}
                setOpenAlert={setOpenAlertFn}
                Data={Message}
            />
        </>
    );
};

export default ProfileBox;
