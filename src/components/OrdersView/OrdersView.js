import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { UPDATE_ORDER_STATUS } from "../../graphql/Mutations/Index";
import { useMutation } from "@apollo/client";
import { GET_ALL_ORDERS } from "../../graphql/Queries/GetAllOrders";
import { createOrder, orderDetails } from "../../recoil/atoms/DrawerTriggers";
import { useRecoilState } from "recoil";
import AddOrder from "../AddOrder/AddOrder";
import OrderDetails from "../OrderDetails/OrderDetails";

const { Column, ColumnGroup } = Table;

const OrdersView = (props) => {
  const [drawerVisible, setDrawerVisible] = useRecoilState(createOrder);
  const [detailsDrawer, setDetailsDrawer] = useRecoilState(orderDetails);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addOrder = () => {
    setDrawerVisible(true);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    updateStatus({
      variables: {
        id: id,
        orderStatus: "Completed",
        updatedAt: new Date(),
      },
      refetchQueries: [
        {
          query: GET_ALL_ORDERS,
          variables: { id: 2 },
        },
      ],
    });
  };

  return (
    <div>
      {props.isPending && (
        <Button type="primary" style={{ marginBottom: 16 }} onClick={addOrder}>
          Add Order
        </Button>
      )}
      <Table dataSource={props.data}>
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex={["customerByCustomerId", "firstName"]}
            key="firstName"
          />
          <Column
            title="Last Name"
            dataIndex={["customerByCustomerId", "lastName"]}
            key="lastName"
          />
        </ColumnGroup>
        <Column
          title="Delivery Date"
          dataIndex="deliveryDate"
          key="deliveryDate"
        />
        <Column title="Total Count" dataIndex="totalCounts" key="totalCounts" />
        <Column title="Total Amount" dataIndex="totalPrice" key="totalPrice" />

        <Column
          title="Order Details"
          key="orderDetails"
          render={(_, record) => (
            <Space size="middle">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#1677ff",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                href="/#"
                onClick={() => {
                  console.log("record", record.id);
                  setSelectedOrder(record);
                  setDetailsDrawer(true);
                }}
              >
                Details
              </button>
            </Space>
          )}
        />
        <Column
          title="Order Status"
          key="action"
          render={(_, record) =>
            record.orderStatus === "pending" ? (
              <Tooltip placement="bottom" title="Complete Order">
                <Space size="middle">
                  <a
                    onClick={(e) => {
                      handleClick(e, record.id);
                    }}
                  >
                    Pending
                  </a>
                </Space>
              </Tooltip>
            ) : (
              <Space size="middle">
                <p> Completed </p>
              </Space>
            )
          }
        />
      </Table>
      {drawerVisible && <AddOrder onClose={() => setDrawerVisible(false)} />}
      {detailsDrawer && (
        <OrderDetails
          onClose={() => setDetailsDrawer(false)}
          orderData={selectedOrder}
        />
      )}
    </div>
  );
};
export default OrdersView;
