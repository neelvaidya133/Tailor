import { gql, useQuery } from "@apollo/client";
const GET_CustomerByID = gql`
  query customerById($id: Int!) {
    customerById(id: $id) {
      id
      firstName
      lastName
      address
      email
      phone
    }
  }
`;

const GetCustomerById = (id) => {
  const { data, loading, error } = useQuery(GET_CustomerByID, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const customer = data?.customerById;
  console.log("customer", customer);

  return { customer, loading, error };
};

export default GetCustomerById;
