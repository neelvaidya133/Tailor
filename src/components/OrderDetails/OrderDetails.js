import React from "react";
import { Button, Drawer } from "antd";
import { useRecoilState } from "recoil";
import { orderDetails } from "../../recoil/atoms/DrawerTriggers";
import pdfMake from "pdfmake/build/pdfmake";
import Cookies from "js-cookie";

import pdfFonts from "pdfmake/build/vfs_fonts";
import GetCustomerById from "../../graphql/Queries/GetCustomerById";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderDetails = (props) => {
  const [drawerVisible, setDrawerVisible] = useRecoilState(orderDetails);
  const customerData = GetCustomerById(props.orderData?.customerId);
  console.log("customerData", customerData);
  console.log("orderData", props.orderData);
  const shopDetails = {
    shopName: Cookies.get("shopName"),
    shopAddress: Cookies.get("shopAddress"),
    shopContact: "1234567890",
  };

  const generateInvoice = () => {
    const date = new Date(props.orderData?.createdAt);
    const orderDate = date.toLocaleDateString("en-CA");
    const order = props.orderData;
    const taxRate = 0.1; // 10% tax rate
    const taxAmount = (props.orderData.totalPrice * taxRate).toFixed(2);
    const totalPriceWithTax = (
      parseFloat(props.orderData.totalPrice) + parseFloat(taxAmount)
    ).toFixed(2);

    const tableBody = [
      ["Item", "Quantity", "Unit Price", "Total"], // Table header row
    ];

    if (props.orderData.shirt > 0)
      tableBody.push([
        "Shirt",
        props.orderData.shirt,
        `$10`,
        `$${(props.orderData.shirt * 10).toFixed(2)}`,
      ]);
    if (props.orderData.pant > 0)
      tableBody.push([
        "Pant",
        props.orderData.pant,
        `$20`,
        `$${(props.orderData.pant * 20).toFixed(2)}`,
      ]);
    if (props.orderData.coat > 0)
      tableBody.push([
        "Coat",
        props.orderData.coat,
        `$30`,
        `$${(props.orderData.coat * 30).toFixed(2)}`,
      ]);
    if (props.orderData.sherwani > 0)
      tableBody.push([
        "Sherwani",
        props.orderData.sherwani,
        `$40`,
        `$${(props.orderData.sherwani * 40).toFixed(2)}`,
      ]);
    if (props.orderData.suit > 0)
      tableBody.push([
        "Suit",
        props.orderData.suit,
        `$50`,
        `$${(props.orderData.suit * 50).toFixed(2)}`,
      ]);

    tableBody.push(
      [
        { text: "Subtotal", colSpan: 3, alignment: "right", bold: true },
        {},
        {},
        `$${props.orderData.totalPrice.toFixed(2)}`,
      ],
      [
        {
          text: `Tax (${(taxRate * 100).toFixed(0)}%)`,
          colSpan: 3,
          alignment: "right",
          bold: true,
        },
        {},
        {},
        `$${taxAmount}`,
      ],
      [
        { text: "Total", colSpan: 3, alignment: "right", bold: true },
        {},
        {},
        `$${totalPriceWithTax}`,
      ]
    );

    const documentDefinition = {
      background: function () {
        return {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 595.28, // A4 width in points
              h: 841.89, // A4 height in points
              color: "#f5f5f0", // Background color
            },
          ],
        };
      },
      content: [
        {
          columns: [
            {
              text: shopDetails.shopName,
              style: "header",
              alignment: "left",
            },
            {
              stack: [
                { text: "INVOICE", style: "invoiceTitle", alignment: "right" },
                {
                  text: `Invoice No. ${order.id}`,
                  alignment: "right",
                },
                {
                  text: new Date().toLocaleDateString("en-CA"),
                  alignment: "right",
                },
              ],
            },
          ],
        },
        {
          text: shopDetails.shopAddress,
          alignment: "left",
        },
        {
          text: `Contact: ${shopDetails.shopContact}`,
          alignment: "left",
          margin: [0, 0, 0, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 515, // Adjust width based on your needs
              y2: 5,
              lineWidth: 2,
              dash: { length: 5 },
            },
          ],
          margin: [0, 10, 0, 10], // Adjust margin as needed
        },
        {
          columns: [
            {
              text: [
                { text: "BILLED TO:\n", bold: true },
                `${customerData.customer.firstName} ${customerData.customer.lastName}\n`,
                `${customerData.customer.phone}\n`,
                `${customerData.customer.address}\n`,
              ],
              alignment: "left",
            },
            {
              text: [
                { text: "ORDER DETAILS:\n", bold: true },
                `Order Date: ${orderDate}\n`,
                `Order Status: ${order.orderStatus}\n`,
                `Delivery Date: ${order.deliveryDate}\n`,
              ],
              alignment: "right",
            },
          ],
        },
        {
          text: "Order Summary",
          style: "subheader",
          margin: [0, 20, 0, 10],
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: tableBody.filter((row) => row !== null),
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex === 0 ? "#4CAF50" : null; // Header background color
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? "black"
                : "#D3D3D3"; // Horizontal line color
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "#D3D3D3"; // Vertical line color
            },
            paddingLeft: function (i, node) {
              return 8; // Padding for left side
            },
            paddingRight: function (i, node) {
              return 8; // Padding for right side
            },
            paddingTop: function (i, node) {
              return 4; // Padding for top side
            },
            paddingBottom: function (i, node) {
              return 4; // Padding for bottom side
            },
          },
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 5,
              x2: 515, // Adjust width based on your needs
              y2: 5,
              lineWidth: 1,
            },
          ],
          margin: [0, 20, 0, 20], // Adjust margin as needed
        },
        {
          text: "Thank you!",
          style: "thanks",
          alignment: "center",
          margin: [0, 20, 0, 20],
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          color: "#4CAF50", // Shop name color
        },
        invoiceTitle: {
          fontSize: 25,
          bold: true,
          margin: [0, 0, 0, 10],
          color: "#333333", // Invoice title color
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 15, 0, 5],
          color: "#4CAF50", // Subheader color
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        thanks: {
          fontSize: 16,
          italics: true,
          color: "#4CAF50", // Thank you color
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <Drawer
      open={drawerVisible}
      title="Order Details"
      placement="right"
      onClose={props.onClose}
    >
      <p>FirstName: {props?.orderData?.customerByCustomerId?.firstName} </p>
      <p>LastName: {props?.orderData?.customerByCustomerId?.lastName} </p>
      <p> Order Date: {props.orderData?.createdAt}</p>
      <p>Delivery Date: {props?.orderData?.deliveryDate} </p>
      <p>Order Status: {props?.orderData?.orderStatus} </p>
      <p> Suit: {props?.orderData?.suit} </p>
      <p> Shirt: {props.orderData?.shirt}</p>
      <p> Pant: {props.orderData?.pant}</p>
      <p> Coat: {props?.orderData?.coat} </p>
      <p> Sherwani: {props?.orderData?.sherwani} </p>
      <p>Total Count: {props?.orderData?.totalCounts} </p>
      <p>Total Price: {props?.orderData?.totalPrice}$ </p>
      {props?.orderData?.orderStatus === "Completed" ? (
        <Button type="primary" onClick={generateInvoice}>
          Generate Invoice
        </Button>
      ) : null}
    </Drawer>
  );
};

export default OrderDetails;
