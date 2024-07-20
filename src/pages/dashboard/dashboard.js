import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetPrices from "../../graphql/Queries/GetPrices";
import Cookies from "js-cookie";
import GetCustomerByCompanyId from "../../graphql/Queries/GetCustomerByCompanyId";
import PriceView from "../../components/PriceView/PriceView";
import CustomerView from "../../components/CustomerView/CustomerView";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import GetAllOrders from "../../graphql/Queries/GetAllOrders";
import PendingOrders from "../../components/OrdersView/OrdersView";
import OrdersView from "../../components/OrdersView/OrdersView";
import { useRecoilValue } from "recoil";
import { shopData } from "../../recoil/atoms/shopData";
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const companyId = parseInt(Cookies.get("shopId"));
  const { prices, loading, error } = GetPrices(companyId);
  const [priceDrawer, setPriceDrawer] = React.useState(false);
  const [openKey, setOpenKey] = React.useState("1");
  const [selectedKey, setSelectedKey] = React.useState("sub1");
  const shopInfo = Cookies.get("shopName");
  const {
    allOrders,
    completedOrders,
    pendingOrders,
    orderLoading,
    orderError,
  } = GetAllOrders(companyId);

  const p = allOrders?.filter((order) => order.orderStatus === "pending");
  console.log("p", p);

  const { customers, customerLoading, customerError } =
    GetCustomerByCompanyId(companyId);
  useEffect(() => {
    console.log("orders", allOrders);
  }, [allOrders]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log(e);
  };
  console.log("allOrders", allOrders);
  console.log("completedOrders", completedOrders);
  console.log("PendingOrders", p);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="">
          <h1
            style={{
              color: "#fff",
            }}
          >
            {shopInfo}
          </h1>
        </div>

        <div>
          <Button
            onClick={() => {
              Cookies.remove("shopId");
              Cookies.remove("jwtToken");
              Cookies.remove("user_id");

              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={["1"]}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Orders",
                children: [
                  { key: "sub1", icon: <UserOutlined />, label: "Pending" },
                  { key: "sub2", icon: <LaptopOutlined />, label: "Completed" },
                  { key: "sub3", icon: <NotificationOutlined />, label: "All" },
                ],
              },
              { key: "2", icon: <LaptopOutlined />, label: "Customers" },
              {
                key: "3",
                icon: <NotificationOutlined />,
                label: "Price",
                onClick: () => setPriceDrawer(true),
              },
            ]}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedKey === "sub1" && (
              <OrdersView data={pendingOrders} isPending={true} />
            )}
            {selectedKey === "sub2" && <OrdersView data={completedOrders} />}
            {selectedKey === "sub3" && <OrdersView data={allOrders} />}
            {selectedKey === "2" &&
              (customers ? (
                <CustomerView customers={customers} companyId={companyId} />
              ) : null)}
          </Content>
          {priceDrawer && (
            <PriceView
              companyId={companyId}
              prices={prices}
              drawer={priceDrawer}
              onClose={() => {
                setPriceDrawer(false);
              }}
            />
          )}
        </Layout>
      </Layout>
    </Layout>
  );

  // return (
  //   <>
  //     <h1>Dashboard</h1>
  //     <div>
  //       <div>
  //         <h2>Orders</h2>
  //       </div>
  //       <div>
  //         <h2>Customers</h2>
  //         {customers ? (
  //           <CustomerView customers={customers} companyId={companyId} />
  //         ) : (
  //           <p>No customers</p>
  //         )}
  //       </div>
  //       <div>
  //         <h2>Price</h2>
  //         <button
  //           onClick={() => {
  //             setPriceDrawer(true);
  //           }}
  //         >
  //           Set Price
  //         </button>
  //         {priceDrawer && (
  //           <PriceView
  //             companyId={companyId}
  //             prices={prices}
  //             drawer={priceDrawer}
  //             onClose={() => {
  //               setPriceDrawer(false);
  //             }}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Dashboard;
