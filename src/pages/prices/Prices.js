import React, { useEffect } from "react";
import { SET_PRICE } from "../../graphql/Mutations/SetPrice";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GetPrices from "../../graphql/Queries/GetPrices";
import { Spin } from "antd";

const Prices = () => {
  const navigate = useNavigate();
  const companyId = parseInt(Cookies.get("shopId"));
  const { prices, loading, error } = GetPrices(companyId);
  const [price, setPrice] = React.useState({
    coatPrice: "",
    pantPrice: "",
    shirtPrice: "",
    suitPrice: "",
    sherwaniPrice: "",
  });

  useEffect(() => {
    if (prices) {
      navigate("/dashboard");
    }
  }, [prices]);

  const [addPrices] = useMutation(SET_PRICE, {
    onCompleted: (data) => {
      console.log(data);

      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (e) => {
    console.log(price);
    e.preventDefault();
    addPrices({
      variables: {
        coatPrice: parseInt(price.coatPrice),
        pantPrice: parseInt(price.pantPrice),
        shirtPrice: parseInt(price.shirtPrice),
        suitPrice: parseInt(price.suitPrice),
        sherwaniPrice: parseInt(price.sherwaniPrice),
        companyId: parseInt(companyId),
      },
    });
  };
  if (!prices) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPrice((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    if (loading) {
      console.log("loading");
      return <Spin delay={5000} />;
    }

    return (
      <>
        <h1>Prices</h1>
        <p>Please set your prices here</p>

        <form onSubmit={handleSubmit}>
          <h2>Add Prices</h2>
          <label>
            Coat Price:
            <input
              required
              type="number"
              name="coatPrice"
              value={price.coatPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Pant Price:
            <input
              required
              type="number"
              name="pantPrice"
              value={price.pantPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Shirt Price:
            <input
              required
              type="number"
              name="shirtPrice"
              value={price.shirtPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Suit Price:
            <input
              required
              type="number"
              name="suitPrice"
              value={price.suitPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Sherwani Price:
            <input
              required
              type="number"
              name="sherwaniPrice"
              value={price.sherwaniPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
};

export default Prices;
