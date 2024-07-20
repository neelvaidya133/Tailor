import React from "react";
import { Drawer } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_CUSTOMER } from "../../graphql/Mutations/Index";
import { useRecoilState } from "recoil";
import { createCustomer } from "../../recoil/atoms/DrawerTriggers";
import { Form, Input, Button } from "antd";

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
        <Form
          name="customerForm"
          layout="vertical"
          onFinish={handleAddCustomer}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input name="firstName" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input name="lastName" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input name="address" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input name="phone" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input name="email" onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: 40 }}>
              Add/Update
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddCustomer;
