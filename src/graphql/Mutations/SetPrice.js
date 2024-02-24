import { gql } from "@apollo/client";

export const SET_PRICE = gql`
  mutation addPrices(
    $companyId: Int!
    $shirtPrice: Int!
    $pantPrice: Int!
    $sherwaniPrice: Int!
    $suitPrice: Int!
    $coatPrice: Int!
  ) {
    createPrice(
      input: {
        price: {
          shirtPrice: $shirtPrice
          pantPrice: $pantPrice
          sherwaniPrice: $sherwaniPrice
          suitPrice: $suitPrice
          coatPrice: $coatPrice
          companyId: $companyId
        }
      }
    ) {
      clientMutationId
    }
  }
`;
