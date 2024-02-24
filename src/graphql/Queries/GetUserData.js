import { gql, useQuery } from "@apollo/client";
import decodeJwt from "../../utils/decodeJwt";

const GET_USER_DATA = gql`
  query ff($id: Int!) {
    userById(id: $id) {
      id
      email
      password
      companiesByOwnerId {
        nodes {
          id
          companyName
          createdAt
          companyAddress
        }
      }
    }
  }
`;

const GetUserData = () => {
  const userID = decodeJwt();

  const { data, loading, error } = useQuery(GET_USER_DATA, {
    variables: { id: userID },
    skip: !userID,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("data", data);
  return data;
};

export default GetUserData;
