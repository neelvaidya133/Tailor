import React, { useState } from "react";
import {
  Container,
  ShopRegisterForm,
  ShopForm,
  Label,
  Input,
  Button,
} from "./style";
import GetCompanyData from "../../graphql/Queries/GetCompanyData";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const ShopRegister = () => {
  const navigate = useNavigate();
  const { hasCompany, companyData, loading, error } = GetCompanyData();
  const [shopId, setShopId] = useState(null);

  if (hasCompany) {
    console.log("hasCompany", hasCompany);
    console.log("companyData", companyData);

    const handleSelect = (e) => {
      const selected = parseInt(e.target.value);
      console.log("selected", selected);
      setShopId(selected);
    };

    const handleContinue = (e) => {
      e.preventDefault();

      Cookies.set("shopId", JSON.stringify(shopId));
      navigate("/prices");
    };
    return (
      <>
        <h1>You have already registered a shop</h1>
        <p>Select your shop</p>
        <select name="shop" id="shop" onChange={handleSelect}>
          <option value="">Select Shop</option>

          {companyData.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <Button type="submit" onClick={handleContinue}>
          Continue
        </Button>
      </>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();

    console.log(hasCompany, loading, error);

    console.log("Register Shop");
  };

  return (
    <>
      <Container>
        <ShopRegisterForm>
          <h1>You Need to Register Shop </h1>
          <ShopForm>
            <Label>Shop Name</Label>
            <Input type="text" placeholder="Shop Name" />
            <Label>Shop Address</Label>
            <Input type="text" placeholder="Shop Address" />

            <Button type="submit" onClick={handleClick}>
              Register
            </Button>
          </ShopForm>
        </ShopRegisterForm>
      </Container>
    </>
  );
};

export default ShopRegister;
