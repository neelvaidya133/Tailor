import { gql, useQuery } from "@apollo/client";

const GET_PRICES = gql`
  query prices($id: Int!) {
    companyById(id: $id) {
      priceByCompanyId {
        coatPrice
        companyId
        createdAt
        id
        pantPrice
        sherwaniPrice
        shirtPrice
        suitPrice
        updatedAt
      }
    }
  }
`;

const GetPrices = (id) => {
  const { data, loading, error } = useQuery(GET_PRICES, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const prices = data?.companyById?.priceByCompanyId;
  console.log("pricesttttttt", prices);

  return { prices, loading, error };
};

export default GetPrices;
