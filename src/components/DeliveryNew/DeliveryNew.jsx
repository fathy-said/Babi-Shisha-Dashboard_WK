import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

// let selectData = ["name", "email", "pass"];
const DeliveryNew = () => {
  // let numberD = 0;
  let { t } = useTranslation();
  // let dispatch = useDispatch();
  // let navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);
  // const [ErrorMessage, setErrorMessage] = React.useState();

  // const [selectTarget, setSelectTarget] = React.useState({
  //   Product: "",
  // });
  // const [targetIdSelect, setTargetIdSelect] = React.useState({
  //   product: "",
  // });
  const [inputValue, setInputValue] = useState({
    name: "",
    license: "",
    phone: "",
    deliveryId:"",
  });
  // const [tableData, setTableData] = useState([]);

  // let {
  //   projectData,
  //   lastPage,
  //   productError,
  //   projectError,
  //   productSelectData,
  //   customerError,
  //   totalError,
  //   startError,
  //   endError,
  // } = useSelector((state) => state.ProjectReducer);

  //  error Message
  // handle fun date
  // console.log(finalDate(startDate));

  // =====data===========
  // const selectRef = useRef(true);
  // useEffect(() => {
  //   if (selectRef.current) {
  //     dispatch(SelectProductThunk());
  //   }
  // }, [dispatch]);

  // handle select on loading

  // useEffect(() => {
  //   if (targetIdSelect.product == "" && productSelectData.length) {
  //     setTargetIdSelect({
  //       ...targetIdSelect,
  //       product: productSelectData[0]?.id,
  //     });
  //   }
  // }, [productSelectData, targetIdSelect]);
  // const TableChange = useCallback(
  //   (e) => {
  //     setTableData(tableData.filter((el) => el.id !== e));
  //   },
  //   [tableData]
  // );
  // // =================
  // const addTable = (e) => {
  //   if (e.currentTarget.parentElement.querySelector("input").value) {
  //     if (
  //       !isNaN(e.currentTarget.parentElement.querySelector("input").value) &&
  //       e.currentTarget.parentElement.querySelector("input").value > 0
  //     ) {
  //       let foundId = productSelectData.filter(
  //         (el) => el.id === targetIdSelect?.product
  //       );

  //       if (
  //         e.currentTarget.parentElement.querySelector("input").value >
  //         foundId[0]?.total_quantity
  //       ) {
  //         setOpen(true);
  //         setErrorMessage(
  //           t(
  //             "code_error.The_amount_entered_is_greater_than_the_available_quantity"
  //           )
  //         );
  //       } else {
  //         let data = [...tableData];
  //         if (data.length) {
  //           data = data.filter((el) => el.id !== targetIdSelect?.product);
  //           data = [
  //             ...data,
  //             {
  //               ...foundId[0],
  //               total_price: Number(
  //                 foundId[0]?.unit_price *
  //                   e.currentTarget.parentElement.querySelector("input").value
  //               ).toFixed(2),
  //               quantity:
  //                 e.currentTarget.parentElement.querySelector("input").value,
  //             },
  //           ];
  //           setTableData(data);
  //         } else {
  //           data = [
  //             ...data,
  //             {
  //               ...foundId[0],
  //               total_price: Number(
  //                 foundId[0]?.unit_price *
  //                   e.currentTarget.parentElement.querySelector("input").value
  //               ).toFixed(2),
  //               quantity:
  //                 e.currentTarget.parentElement.querySelector("input").value,
  //             },
  //           ];
  //           setTableData(data);
  //         }
  //       }
  //       e.currentTarget.parentElement.querySelector("input").value = "";
  //     } else {
  //       setOpen(true);
  //       setErrorMessage(
  //         t("pages.ComponyExpensesAdd.The_Quantity_Must_be_Number")
  //       );
  //     }
  //   } else {
  //     setOpen(true);
  //     setErrorMessage(
  //       t("pages.ComponyExpensesAdd.The_Quantity_Must_be_Number")
  //     );
  //   }
  // };
  // ================

  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   let data = tableData.map((el) => {
  //     return {
  //       id: el.id,
  //       quantity: el.quantity,
  //     };
  //   });
  //   data = {
  //     project_name: inputValue.project,
  //     customer_name: inputValue.customer,
  //     start_date: finalDate(startDate),
  //     end_date: finalDate(endDate),
  //     project_total: inputValue.total,
  //     materials: data,
  //   };
  //   // console.log(finalDate(startDate));
  //   // console.log(finalDate(endDate));

  //   dispatch(UpdateProjectThunk(data))
  //     .unwrap()
  //     .then((data) => {
  //       // console.log(data);
  //       dispatch(openMessageAlert());

  //       navigate("/admin/project");
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       //    setCode(error.code);
  //     });
  // };
  // useEffect(() => {
  //   return () => {
  //     dispatch(closeError());
  //   };
  // }, []);
  // useEffect(() => {
  //   dispatch(closeError());
  // }, [dispatch, inputValue]);
  return (
    <>
      <div className="p-[20px] mt-[40px]">
        <form
          action=""
          className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
          // onSubmit={handleSubmit}
        >
          <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
              <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                {/* {t("pages.ProjectAdd.Project_Name")} */}
                Name
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
              {/* {projectError !== null && (
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
                  {projectError}
                </span>
              )} */}
            </FormControl>
            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
              <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                {/* {t("pages.ProjectAdd.Project_Name")} */}
                License
              </h6>
              <input
                type="text"
                value={inputValue.project}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    license: e.target.value,
                  });
                }}
              />
              {/* {projectError !== null && (
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
                  {projectError}
                </span>
              )} */}
            </FormControl>
            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
              <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                {/* {t("pages.ProjectAdd.Customer_Name")} */}
                Phone
              </h6>
              <input
                type="tel"
                value={inputValue.customer}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    phone: e.target.value,
                  });
                }}
              />
              {/* {customerError !== null && (
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
                  {customerError}
                </span>
              )}{" "} */}
            </FormControl>
            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
              <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                {/* {t("pages.ProjectAdd.Project_Total")} */}
                Delivery Id (Select)
              </h6>
              <input
                type="text"
                value={inputValue.total}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    deliveryId: e.target.value,
                  });
                }}
              />
              {/* {totalError !== null && (
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
                  {totalError}
                </span>
              )} */}
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
          >
            {/* {t("pages.ProjectAdd.Submit")} */}
            Submit
          </Button>
        </form>
      </div>
      {/* <ErrorBox setOpen={setOpen} open={open} Data={ErrorMessage} /> */}
    </>
  );
};

export default React.memo(DeliveryNew);
