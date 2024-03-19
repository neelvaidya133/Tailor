import React, { useEffect, useState } from "react";
import CustomerMeasurement from "../CustomerMeasurements/CustomerMeasurement";

import AddCustomer from "../AddCustomer/AddCustomer";
import { useRecoilState } from "recoil";
import { Table, Space, Button } from "antd";
import {
  CustomerMeas,
  createCustomer,
} from "../../recoil/atoms/DrawerTriggers";

const { Column, ColumnGroup } = Table;
const CustomerView = (props) => {
  console.log("props", props.customers);
  const [drawerVisible, setDrawerVisible] = useRecoilState(CustomerMeas);
  const [customerDrawer, setCustomerDrawer] = useRecoilState(createCustomer);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleMeasurment = (id) => {
    console.log("checkedDrawer", id, drawerVisible);
    setSelectedCustomerId(id);
    setDrawerVisible(true);
  };

  return (
    <div>
      <Button
        onClick={() => setCustomerDrawer(true)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Customer
      </Button>
      <Table dataSource={props.customers}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="Email" dataIndex="email" key="email" />

        <Column
          title="Measurements"
          key="measurements"
          render={(_, record) => (
            <Space size="middle">
              <button
                href="/#"
                onClick={() => {
                  handleMeasurment(record.id);
                }}
              >
                Details
              </button>
            </Space>
          )}
        />
      </Table>
      {drawerVisible && (
        <CustomerMeasurement
          customerId={selectedCustomerId}
          onClose={() => setDrawerVisible(false)}
        />
      )}

      {customerDrawer && (
        <AddCustomer
          companyId={props.companyId}
          drawer={customerDrawer}
          onClose={() => setCustomerDrawer(false)}
        />
      )}
    </div>
  );
};

export default CustomerView;

// <>
//       <h1>CustomerView</h1>
//       <button onClick={() => setCustomerDrawer(true)}>Add Customer</button>
//       <table>
//         <thead>
//           <tr>
//             <th> No</th>
//             <th> FirstName</th>
//             <th> LasName</th>
//             <th> Address</th>
//             <th> Phone </th>
//             <th> Email </th>
//             <th> Measurement </th>
//           </tr>
//         </thead>
//         <tbody>
//           {props.customers.map((customer) => (
//             <tr key={customer.id}>
//               <td>{customer.id}</td>
//               <td>{customer.firstName}</td>
//               <td>{customer.lastName}</td>
//               <td>{customer.address}</td>
//               <td>{customer.phone}</td>
//               <td>{customer.email}</td>
//               <td>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleMeasurment(customer.id);
//                   }}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </>
