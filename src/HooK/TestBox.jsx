import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const TestBox = ({ children, type }) => {
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType")
    );
    useEffect(() => {
        setAccountType(localStorage.getItem("accountType"));
    }, [localStorage.getItem("accountType")]);
    return accountType == type ? (
        children
    ) : (
        <Navigate to="/admin" replace={true} />
    );
};

export default TestBox;
//  {accountType=="admin"&&}
