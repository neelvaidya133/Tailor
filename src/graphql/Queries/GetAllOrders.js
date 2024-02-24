import { gql, useQuery } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query ordersByCompanyId($id: Int!) {
    companyById(id: $id) {
      id
      ordersByCompanyId {
        nodes {
          id
          customerId
          shirt
          pant
          sherwani
          suit
          coat
          orderStatus
          totalCounts
          totalPrice
          deliveryDate
          updatedAt
          createdAt
        }
      }
    }
  }
`;

const GetAllOrders = (id) => {
  const { data, loading, error } = useQuery(GET_ALL_ORDERS, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const allOrders = data?.companyById;
  console.log("orders", allOrders);

  return { allOrders, loading, error };
};

export default GetAllOrders;
