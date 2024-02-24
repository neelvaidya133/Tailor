import { atom } from "recoil";

export const CustomerMeas = atom({
  key: "CustomerMeasurement",
  default: false,
});
export const createCustomer = atom({
  key: "NewCustomer",
  default: false,
});
