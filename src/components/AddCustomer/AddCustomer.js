import React from "react";
import { Drawer } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_CUSTOMER } from "../../graphql/Mutations/Index";
import { useRecoilState } from "recoil";
import { createCustomer } from "../../recoil/atoms/DrawerTriggers";
import { GET_CustomerByCompanyId } from "../../graphql/Queries/GetCustomerByCompanyId";

const AddCustomer = (props) => {
  const [customer, setCustomer] = React.useState({});
  const [drawerVisible, setDrawerVisible] = useRecoilState(createCustomer);
  const [newCustomer] = useMutation(CREATE_NEW_CUSTOMER, {
    onCompleted: (data) => {
      console.log(data);
      setDrawerVisible(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddCustomer = () => {
    newCustomer({
      variables: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        phone: customer.phone,
        email: customer.email,
        companyId: props.companyId,
      },
      refetchQueries: [
        {
          query: GET_CustomerByCompanyId,
          variables: { id: props.companyId },
        },
      ],
    });
  };
  return (
    <>
      <Drawer
        open={drawerVisible}
        title="Add Customer"
        placement="right"
        onClose={props.onClose}
      >
        <p>FirstName:</p>
        <input type="text" name="firstName" onChange={handleChange} required />
        <p>LastName:</p>
        <input type="text" name="lastName" onChange={handleChange} required />
        <p>Address:</p>
        <input type="text" name="address" onChange={handleChange} required />
        <p>Phone:</p>
        <input type="text" name="phone" onChange={handleChange} required />
        <p>Email:</p>
        <input type="email" name="email" onChange={handleChange} required />
        <div style={{ textAlign: "left" }}>
          <button
            onClick={handleAddCustomer}
            style={{ marginRight: 8, marginTop: 40 }}
          >
            Add/Update
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default AddCustomer;
