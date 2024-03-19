import React, { useEffect, useState } from "react";
import { Drawer, Segmented } from "antd";
import { GetCustomerMeasurementsByCustomerId } from "../../graphql/Queries/Index";
import { UPDATE_CUSTOMER_MEASUREMENT } from "../../graphql/Mutations/Index";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_MEASUREMENT } from "../../graphql/Mutations/Index";
import { useRecoilState } from "recoil";
import { CustomerMeas } from "../../recoil/atoms/DrawerTriggers";
import { GET_CUSTOMER_MEASUREMENTS } from "../../graphql/Queries/GetCustomerMeasurements";

const CustomerMeasurement = ({ customerId, onClose }) => {
  const [clothType, setClothType] = useState("shirt");
  const [drawerVisible, setDrawerVisible] = useRecoilState(CustomerMeas);
  const defaultMeasurements = {
    shirt: {
      neck: "",
      chest: "",
      hip: "",
      waist: "",
      sleeve: "",
      length: "",
    },
    pant: {
      length: "",
      waist: "",
      hip: "",
      thigh: "",
    },
    sherwani: {
      neck: "",
      chest: "",
      hip: "",
      waist: "",
      sleeve: "",
      length: "",
    },
    suit: {
      neck: "",
      chest: "",
      hip: "",
      waist: "",

      sleeve: "",
      length: "",
    },
    coat: {
      neck: "",
      chest: "",
      hip: "",
      waist: "",
      sleeve: "",
      length: "",
    },
  };
  const handleDrawerClose = () => {
    setDrawerVisible(false);
    onClose();
  };
  const [measurementInput, setMeasurementInput] = useState({
    shirt: defaultMeasurements.shirt,
  });
  const [newMeasurement] = useMutation(CREATE_CUSTOMER_MEASUREMENT, {
    onCompleted({ data }) {
      console.log("data", data);
      setDrawerVisible(false);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const [updateCustomerMeasurement] = useMutation(UPDATE_CUSTOMER_MEASUREMENT, {
    onCompleted({ data }) {
      setDrawerVisible(false);

      console.log("data", data);
    },

    onError: (error) => {
      console.log("error", error);
    },
  });
  const { measurements, loading, error } =
    GetCustomerMeasurementsByCustomerId(customerId);

  useEffect(() => {
    const clothDataString = measurements?.[clothType.toLowerCase()];
    const clothDataObj = clothDataString
      ? JSON.parse(clothDataString)
      : defaultMeasurements[clothType];
    setMeasurementInput((prevState) => {
      return {
        ...prevState,
        [clothType]: {
          ...clothDataObj,
        },
      };
    });
    console.log("clothDataObj", measurementInput);
  }, [clothType, measurements, drawerVisible]);
  const currentMeasurements = measurementInput[clothType] || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurementInput((prevState) => ({
      ...prevState,
      [clothType]: {
        ...prevState[clothType],
        [name]: value,
      },
    }));
  };
  const handleFormSubmit = () => {
    if (measurements) {
      const updatedMeasurement = JSON.stringify(measurementInput[clothType]);
      const variables = {
        [clothType.toLowerCase()]: updatedMeasurement,
        updatedAt: new Date(),
        customerId: customerId,
      };

      updateCustomerMeasurement({
        variables: {
          ...variables,
        },
        refetchQueries: [
          {
            query: GET_CUSTOMER_MEASUREMENTS,
            variables: { customerId: customerId },
          },
        ],
      });
    } else if (!measurements) {
      console.log(measurementInput[clothType]);
      const mergedMeasurements = Object.keys(defaultMeasurements).reduce(
        (acc, clothType) => {
          acc[clothType] = JSON.stringify(
            measurementInput[clothType] || defaultMeasurements[clothType]
          );
          return acc;
        },
        {}
      );

      const variables = {
        customerId: customerId,
        createdAt: new Date(),
        ...mergedMeasurements,
      };
      console.log("variables", variables);
      newMeasurement({
        variables: {
          ...variables,
        },
      });
    }
  };
  const getFilteredData = () => {
    // Attempt to parse measurement data for the current cloth type
    try {
      return Object.entries(currentMeasurements).map(([key, value]) => (
        <div key={key}>
          <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}`}</p>
          <input
            type="number"
            name={key}
            value={measurementInput[key] ?? value}
            onChange={handleInputChange}
          />
        </div>
      ));
    } catch (error) {
      console.error("Error parsing measurement data:", error);
      return <p>Error parsing measurement data</p>;
    }
  };

  return (
    <>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        open={drawerVisible}
      >
        <Segmented
          options={["Shirt", "Pant", "Sherwani", "Suit", "Coat"]}
          onChange={(value) => {
            setClothType(value.toLocaleLowerCase());
          }}
        />

        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        <div>{getFilteredData()}</div>
        <div style={{ textAlign: "left" }}>
          <button
            onClick={handleFormSubmit}
            style={{ marginRight: 8, marginTop: 40 }}
          >
            Add/Update
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default CustomerMeasurement;
