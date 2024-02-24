import React from "react";
import { Drawer } from "antd";

const PriceView = (props) => {
  const [price, setPrice] = React.useState(props.prices);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClick = () => {
    const variables = {
      coatPrice: parseInt(price.coatPrice),
      pantPrice: parseInt(price.pantPrice),
      shirtPrice: parseInt(price.shirtPrice),
      suitPrice: parseInt(price.suitPrice),
      sherwaniPrice: parseInt(price.sherwaniPrice),
      companyId: parseInt(props.companyId),
      updatedAt: new Date().toLocaleDateString(),
    };
    console.log("variables", variables);
  };

  return (
    <Drawer
      title="Prices"
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.drawer}
    >
      <p>Coat Price: </p>
      <input
        required
        type="number"
        name="coatPrice"
        value={price.coatPrice}
        onChange={handleChange}
      />
      <p>Pant Price: </p>
      <input
        required
        type="number"
        name="pantPrice"
        value={price.pantPrice}
        onChange={handleChange}
      />
      <p>Shirt Price: </p>
      <input
        required
        type="number"
        name="shirtPrice"
        value={price.shirtPrice}
        onChange={handleChange}
      />
      <p>Suit Price:</p>
      <input
        required
        type="number"
        name="suitPrice"
        value={price.suitPrice}
        onChange={handleChange}
      />
      <p>Sherwani Price:</p>
      <input
        required
        type="number"
        name="sherwaniPrice"
        value={price.sherwaniPrice}
        onChange={handleChange}
      />
      <div style={{ textAlign: "left" }}>
        <button onClick={handleClick} style={{ marginRight: 8, marginTop: 40 }}>
          Update
        </button>
      </div>
    </Drawer>
  );
};

export default PriceView;
