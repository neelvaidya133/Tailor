import React, { useEffect, useState } from "react";
import CustomerMeasurement from "../CustomerMeasurements/CustomerMeasurement";
import { CREATE_NEW_CUSTOMER } from "../../graphql/Mutations/CreateNewCustomer";
import { useMutation } from "@apollo/client";
import AddCustomer from "../AddCustomer/AddCustomer";
import { useRecoilState } from "recoil";
import {
  CustomerMeas,
  createCustomer,
} from "../../recoil/atoms/DrawerTriggers";

const CustomerView = (props) => {
  console.log("props", props);
  const [drawerVisible, setDrawerVisible] = useRecoilState(CustomerMeas);
  const [customerDrawer, setCustomerDrawer] = useRecoilState(createCustomer);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const [newCustomer] = useMutation(CREATE_NEW_CUSTOMER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleMeasurment = (id) => {
    console.log("checkedDrawer", id, drawerVisible);
    setSelectedCustomerId(id);
    setDrawerVisible(true);
  };

  return (
    <>
      <h1>CustomerView</h1>
      <button onClick={() => setCustomerDrawer(true)}>Add Customer</button>
      <table>
        <thead>
          <tr>
            <th> No</th>
            <th> FirstName</th>
            <th> LasName</th>
            <th> Address</th>
            <th> Phone </th>
            <th> Email </th>
            <th> Measurement </th>
          </tr>
        </thead>
        <tbody>
          {props.customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleMeasurment(customer.id);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
};

export default CustomerView;
