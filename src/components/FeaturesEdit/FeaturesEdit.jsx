import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeError } from "../../RTK/Reducers/CategoriesReducer";
import { OneFeaturesThunk } from "../../RTK/Thunk/OneFeaturesThunk";
import { UpdateFeaturesThunk } from "../../RTK/Thunk/UpdateFeaturesThunk";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";

const FeaturesEdit = () => {
  let { t } = useTranslation();
  let dispatch = useDispatch();
  let param = useParams();
  let navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState({
    input_en: "",
  });
  let { name_en_Error, featuresName, } =
    useSelector((state) => state.FeaturesReducer);
  //handle get data
  const getDataRef = useRef(true);
  useEffect(() => {
    if (getDataRef.current) {
      dispatch(OneFeaturesThunk({ id: param.editFeatures }));
      getDataRef.current = false;
    }
  }, [dispatch, param.editFeatures]);

  // handle on loading data
  useEffect(() => {
    if (featuresName) {
      setInputValue({
        input_en: featuresName,
      });
    }
  }, [featuresName]);


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
      UpdateFeaturesThunk({
        id: param.editFeatures,
        name: inputValue?.input_en,
      })
    )
      .unwrap()
      .then((data) => {
        // console.log(data);
        dispatch(openMessageAlert());
        navigate("/admin/features/");
      })
      .catch((error) => {
        // console.log(error);
        // setCode(error.code);
        // handle error here
      });
  };
  // img fun handle
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
                {t("pages.FeaturesEdit.add.name")}
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
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-5 !ml-auto"
          >
            {t("pages.FeaturesEdit.add.Submit")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default FeaturesEdit;
