import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { finalDate } from "../../HooK/ConvertDate";
import { closeError } from "../../RTK/Reducers/CouponReducer";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
import { AddCouponThunk } from "../../RTK/Thunk/AddCouponThunk";

const CouponNew = () => {
    let { t } = useTranslation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date("2023/06/01"));
    const [endDate, setEndDate] = useState(new Date("2023/06/02"));

    const [inputValue, setInputValue] = useState({
        name: "",
        percentage: "",
        maxUsers: "",
    });
    let {
        lastPage,
        name_er,
        user_er,
        percentage_er,
        couponData,
        startDataError,
        endDataError,
    } = useSelector((state) => state.CouponReducer);

    // =================

    // ================

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            start_date: finalDate(startDate),
            end_date: finalDate(endDate),
            name: inputValue.name,
            percentage: inputValue.percentage,
            maxUsers: inputValue.maxUsers,
        };
        // console.log(data);
        dispatch(AddCouponThunk(data))
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());
                navigate("/admin/coupon");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    useEffect(() => {
        return () => {
            dispatch(closeError());
        };
    }, []);
    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex-wrap  flex   md:flex-row   justify-start items-start gap-[30px] w-full mb-4">
                        <FormControl className="min-h-[75.5px]   xl:w-[320px] w-full ">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.couponBox.name")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.project}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            {name_er !== null && (
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
                                    {name_er}
                                </span>
                            )}
                        </FormControl>
                        <FormControl className="min-h-[75.5px] xl:w-[320px] w-full ">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.couponBox.Percentage")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.customer}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        percentage: e.target.value,
                                    });
                                }}
                            />
                            {percentage_er !== null && (
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
                                    {percentage_er}
                                </span>
                            )}
                        </FormControl>
                        <FormControl className="min-h-[75.5px] xl:w-[320px] w-full ">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.couponBox.max_users")}
                            </h6>
                            <input
                                type="text"
                                value={inputValue.total}
                                onChange={(e) => {
                                    setInputValue({
                                        ...inputValue,
                                        maxUsers: e.target.value,
                                    });
                                }}
                            />
                            {user_er !== null && (
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
                                    {user_er}
                                </span>
                            )}
                        </FormControl>
                    </div>
                    <hr className=" w-full my-[40px]" />
                    <div className=" flex flex-col md:flex-row   md:justify-start justify-center items-center gap-[30px] w-full ">
                        {/* className='w-full max-w-[400px]' */}
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.couponBox.Start_Date")}
                            </h6>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                            {startDataError !== null && (
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
                                    {startDataError}
                                </span>
                            )}
                        </FormControl>
                        <FormControl className="min-h-[75.5px]  w-full lg:max-w-[440px]">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.couponBox.End_Date")}
                            </h6>
                            <DatePicker
                                selected={endDate}
                                dateFormat="yyyy/MM/dd"
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                            {endDataError !== null && (
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
                                    {endDataError}
                                </span>
                            )}
                        </FormControl>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.couponBox.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default React.memo(CouponNew);
