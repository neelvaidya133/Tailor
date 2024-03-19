import { atom } from "recoil";

export const CustomerMeas = atom({
  key: "CustomerMeasurement",
  default: false,
});
export const createCustomer = atom({
  key: "NewCustomer",
  default: false,
});

export const createOrder = atom({
  key: "NewOrder",
  default: false,
});

export const orderDetails = atom({
  key: "OrderDetails",
  default: false,
});
