import React from "react";
import { Button, Drawer } from "antd";
import { useRecoilState } from "recoil";
import { orderDetails } from "../../recoil/atoms/DrawerTriggers";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const OrderDetails = (props) => {
  const [drawerVisible, setDrawerVisible] = useRecoilState(orderDetails);
  console.log("dsds", props.orderData);
  const generateInvoice = () => {
    const order = props.orderData;
    const documentDefinition = {
      content: [
        {
          text: "Store Name",
          style: "header",
          alignment: "center",
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
          text: [
            { text: "Customer Name: ", bold: true },
            "John Doe", // Dynamically replace with actual customer name
          ],
          margin: [0, 5, 0, 5],
        },
        {
          text: "Order Details",
          style: "subheader",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            body: [
              ["Item", "Quantity", "Price"], // Table header row
              ["Shirt", "2", "$40"], // These rows should be dynamically generated based on order details
              ["Pant", "1", "$20"],
              ["Total", "", "$60"], // Calculate total and populate dynamically
            ],
          },
          layout: "lightHorizontalLines", // Choose a layout that fits your design needs
        },
        {
          text: [
            { text: "Date: ", bold: true },
            "2024-02-29", // Dynamically replace with the actual date
          ],
          margin: [0, 10, 0, 5],
        },
        {
          text: [
            { text: "Total Count: ", bold: true },
            "3", // Dynamically calculate and replace with actual total count
          ],
          margin: [0, 5, 0, 5],
        },
        {
          text: [
            { text: "Total Amount: ", bold: true },
            "$60", // Dynamically calculate and replace with actual total amount
          ],
          margin: [0, 5, 0, 5],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10], // Adjust the top margin to space out the header
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  };
  return (
    <>
      <Drawer
        open={drawerVisible}
        title="Order Details"
        placement="right"
        onClose={props.onClose}
      >
        <p>FirstName: {props?.orderData?.customerByCustomerId?.firstName} </p>{" "}
        <p>LastName: {props?.orderData?.customerByCustomerId?.lastName} </p>
        <p>Total Count: {props?.orderData?.totalCounts} </p>
        <p>Total Price: {props?.orderData?.totalPrice}$ </p>
        <p>Delivery Date: {props?.orderData?.deliveryDate} </p>
        <p>Order Status: {props?.orderData?.orderStatus} </p>
        <p> Shirt: {props.orderData?.shirt}</p>
        <p> Pant: {props.orderData?.pant}</p>
        <p> Coat: {props?.orderData?.coat} </p>
        <p> Sherwani: {props?.orderData?.sherwani} </p>
        <p> Suit: {props?.orderData?.suit} </p>
        <p> Order Date: {props.orderData?.createdAt}</p>
        {props?.orderData?.orderStatus === "Completed" ? (
          <Button type="primary" onClick={generateInvoice}>
            Generate Invoice
          </Button>
        ) : null}
      </Drawer>
    </>
  );
};

export default OrderDetails;
