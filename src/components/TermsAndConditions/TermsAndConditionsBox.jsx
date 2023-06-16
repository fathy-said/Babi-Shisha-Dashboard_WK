import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./TermsAndConditionsBox.css";


import {  useSelector } from "react-redux";
const TermsAndConditionsBox = () => {
  let { t } = useTranslation();

  // let dispatch = useDispatch();
  

  const [inputValue, setInputValue] = React.useState('');
  
  

  
  
  let handleSubmit = (e) => {
    e.preventDefault();
  };
  // ===================================

  let { typeAlert } = useSelector((state) => state.MessageReducer);

  useEffect(() => {
    if (typeAlert) {
  
    }
    return () => {
  
    };
  }, [typeAlert, t]);
  return (
    <>
      <div className=" w-full add-box mt-[40px] mx-auto pb-[120px] h-full flex justify-center items-start">
        <form onClick={handleSubmit}
          className="box   w-full add-shadow max-w-[600px] gap-[30px] flex flex-col justify-start items-start  py-[60px]  px-[20px] "
          
        >
          <div className=" flex flex-col justify-start items-start w-full gap-[10px] ">
            <h6 className=" text-[17px]   font-[500] capitalize  ">
              Terms and Conditions
            </h6>
            <input
              type="text"
              className=" !pb-32"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px] !ml-auto"
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default TermsAndConditionsBox;
