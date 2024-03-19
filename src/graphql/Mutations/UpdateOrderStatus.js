import { gql } from "@apollo/client";

export const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus(
    $id: Int!
    $orderStatus: String!
    $updatedAt: Datetime!
  ) {
    updateOrderById(
      input: {
        orderPatch: { orderStatus: $orderStatus, updatedAt: $updatedAt }
        id: $id
      }
    ) {
      clientMutationId
      order {
        id
        orderStatus
        updatedAt
      }
    }
  }
`;
