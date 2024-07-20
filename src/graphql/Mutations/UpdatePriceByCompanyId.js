import { gql } from "@apollo/client";

export const UPDATE_PRICE_BY_COMPANY_ID = gql`
  mutation updatePriceByCompanyId(
    $companyId: Int!
    $pantPrice: Int
    $shirtPrice: Int
    $suitPrice: Int
    $sherwaniPrice: Int
    $coatPrice: Int
  ) {
    updatePriceByCompanyId(
      input: {
        companyId: $companyId
        pricePatch: {
          coatPrice: $coatPrice
          pantPrice: $pantPrice
          shirtPrice: $shirtPrice
          suitPrice: $suitPrice
          sherwaniPrice: $sherwaniPrice
        }
      }
    ) {
      clientMutationId
    }
  }
`;
