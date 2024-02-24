import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = Cookies?.get("jwtToken");
  console.log("token", token);
  // const userShop = useSelector((state) => state.shop);
  // console.log("userShop", userShop);
  // const shopPrices = useSelector((state) => state.prices);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
