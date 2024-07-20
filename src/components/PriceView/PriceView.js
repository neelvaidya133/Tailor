import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Spin } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PRICE_BY_COMPANY_ID } from "../../graphql/Mutations/UpdatePriceByCompanyId";
import { GET_PRICES } from "../../graphql/Queries/GetPrices";

const PriceView = (props) => {
  const [form] = Form.useForm();

  const { loading, error, data, refetch } = useQuery(GET_PRICES, {
    variables: { id: props.companyId },
  });

  const [updatePriceByCompanyId] = useMutation(UPDATE_PRICE_BY_COMPANY_ID, {
    onCompleted: (data) => {
      console.log(data);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      const price = data.companyById.priceByCompanyId;
      form.setFieldsValue({
        coatPrice: price.coatPrice,
        pantPrice: price.pantPrice,
        shirtPrice: price.shirtPrice,
        suitPrice: price.suitPrice,
        sherwaniPrice: price.sherwaniPrice,
      });
    }
  }, [data, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({
      [name]: value,
    });
  };

  const handleClick = () => {
    const values = form.getFieldsValue();
    const variables = {
      coatPrice: parseInt(values.coatPrice),
      pantPrice: parseInt(values.pantPrice),
      shirtPrice: parseInt(values.shirtPrice),
      suitPrice: parseInt(values.suitPrice),
      sherwaniPrice: parseInt(values.sherwaniPrice),
      companyId: parseInt(props.companyId),
    };
    console.log("variables", variables);
    updatePriceByCompanyId({
      variables: variables,
      refetchQueries: [
        {
          query: GET_PRICES,
          variables: { id: props.companyId },
        },
      ],
    });
  };

  if (loading) return <Spin />;
  if (error) return <p>Error loading prices.</p>;

  return (
    <Drawer
      title="Prices"
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.drawer}
    >
      <Form
        form={form}
        name="priceForm"
        layout="vertical"
        onFinish={handleClick}
      >
        <Form.Item
          label="Coat Price"
          name="coatPrice"
          rules={[{ required: true, message: "Please input the coat price!" }]}
        >
          <Input type="number" name="coatPrice" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Pant Price"
          name="pantPrice"
          rules={[{ required: true, message: "Please input the pant price!" }]}
        >
          <Input type="number" name="pantPrice" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Shirt Price"
          name="shirtPrice"
          rules={[{ required: true, message: "Please input the shirt price!" }]}
        >
          <Input type="number" name="shirtPrice" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Suit Price"
          name="suitPrice"
          rules={[{ required: true, message: "Please input the suit price!" }]}
        >
          <Input type="number" name="suitPrice" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Sherwani Price"
          name="sherwaniPrice"
          rules={[
            { required: true, message: "Please input the sherwani price!" },
          ]}
        >
          <Input type="number" name="sherwaniPrice" onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 40 }}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default PriceView;
