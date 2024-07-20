import { Button, Drawer, Form, Select, Input, DatePicker } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { createOrder } from "../../recoil/atoms/DrawerTriggers";
import { CREATE_ORDER } from "../../graphql/Mutations/CreateOrder";
import { useMutation, useQuery } from "@apollo/client";
import GetCustomerByCompanyId, {
  GET_CustomerByCompanyId,
} from "../../graphql/Queries/GetCustomerByCompanyId";

import { GET_ALL_ORDERS } from "../../graphql/Queries/GetAllOrders";
import Cookies from "js-cookie";

const AddOrder = (props) => {
  const companyId = parseInt(Cookies.get("shopId"));
  const { customers } = GetCustomerByCompanyId(companyId);
  const { Option } = Select;
  console.log("customersData", customers);
  const [drawerVisible, setDrawerVisible] = useRecoilState(createOrder);
  const [formData, setFormData] = React.useState({});
  const [createNewOrder] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      console.log(data);
      setDrawerVisible(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [form] = Form.useForm();

  const handleChange = (values) => {
    const newOrderData = {
      ...values,
      shirt: parseInt(values.shirt) || 0,
      pant: parseInt(values.pant) || 0,
      sherwani: parseInt(values.sherwani) || 0,
      suit: parseInt(values.suit) || 0,
      coat: parseInt(values.coat) || 0,
      deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),
      companyId: companyId,
      orderStatus: "pending",
      createdAt: new Date().toDateString,
    };
    console.log(newOrderData);
    createNewOrder({
      variables: {
        order: newOrderData,
      },
      refetchQueries: [
        {
          query: GET_ALL_ORDERS,
          variables: { id: companyId },
        },
      ],
    });
  };

  return (
    <>
      <Drawer
        title="Add Order"
        placement="right"
        onClose={props.onClose}
        open={drawerVisible}
      >
        <Form form={form} layout="vertical" onFinish={handleChange}>
          <Form.Item
            name="customerId"
            label="Customer"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a customer"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {customers?.map((customer) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName} -{customer.phone}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Additional form items for order details */}
          <Form.Item
            name="deliveryDate"
            label="Delivery Date"
            rules={[{ required: true }]}
          >
            <DatePicker name="deliveryDate" />
          </Form.Item>
          <Form.Item name="shirt" label="Shirt">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="pant" label="Pant">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="sherwani" label="Sherwani">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="suit" label="Suit">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="coat" label="Coat">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            Add Order
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AddOrder;
