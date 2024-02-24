import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/login";
import Signup from "../pages/signup/signup";
import ShopRegister from "../pages/newShop/ShopRegister";
import Dashboard from "../pages/dashboard/dashboard";
import Prices from "../pages/prices/Prices";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/registerShop" element={<ShopRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prices" element={<Prices />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
