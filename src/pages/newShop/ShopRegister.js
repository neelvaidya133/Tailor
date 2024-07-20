import React, { useEffect, useState } from "react";
import {
  Container,
  ShopRegisterForm,
  ShopForm,
  Label,
  Input,
  Button,
  SelectContainer,
  Wraper,
  SelectWrapper,
  SelectLeft,
  SelectRight,
} from "./style";
import GetCompanyData from "../../graphql/Queries/GetCompanyData";
import selectshopimg from "../../assets/login_image.jpg";
import { useNavigate } from "react-router-dom";
import { Select, Spin } from "antd";
import Cookies from "js-cookie";
import GetPrices from "../../graphql/Queries/GetPrices";

const ShopRegister = () => {
  const navigate = useNavigate();
  const { hasCompany, companyData, loading, error } = GetCompanyData();
  const [shopId, setShopId] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const { prices, Priceloading, Priceerror } = GetPrices(shopId);

  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsloading(false); // This will hide the spinner after 3 seconds
    }, 1000);
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (isLoading) {
    return (
      <Spin
        tip="Loading..."
        size="large"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  if (hasCompany) {
    console.log("hasCompany", hasCompany);
    console.log("companyData", companyData);

    const handleSelect = (e) => {
      if (e.target.value === "") {
        setButtonState(true);
      } else {
        setButtonState(false);
      }

      const selected = parseInt(e.target.value);
      console.log("selected", selected);
      setShopId(selected);
    };

    const handleContinue = (e) => {
      e.preventDefault();
      setIsloading(true);

      Cookies.set("shopId", JSON.stringify(shopId));
      if (prices) {
        navigate("/dashboard");
      }
      navigate("/prices");
      Cookies.set(
        "shopName",
        companyData.find((company) => company.id === shopId).companyName
      );
      Cookies.set(
        "shopAddress",
        companyData.find((company) => company.id === shopId).companyAddress
      );
    };

    return (
      <>
        <SelectContainer>
          <SelectWrapper>
            <SelectLeft>
              <img src={selectshopimg} alt="selectshop" />
            </SelectLeft>

            <SelectRight>
              <Wraper>
                <h1>You have already registered a shop</h1>
                <p>Select your shop </p>
                <select name="shop" id="shop" onChange={handleSelect}>
                  <option value="">Select Shop</option>

                  {companyData.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  onClick={handleContinue}
                  disabled={buttonState}
                >
                  Continue
                </Button>
              </Wraper>
            </SelectRight>
          </SelectWrapper>
        </SelectContainer>
      </>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();

    console.log(hasCompany, loading, error);
    Cookies.set("shopId", JSON.stringify(shopId));

    navigate("/prices");

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
