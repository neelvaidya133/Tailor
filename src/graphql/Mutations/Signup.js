import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $inputName: String!
    $inputPhone: String!
    $inputEmail: String!
    $inputPassword: String!
  ) {
    signup(
      input: {
        inputEmail: $inputEmail
        inputName: $inputName
        inputPassword: $inputPassword
        inputPhone: $inputPhone
        inputRole: "company"
      }
    ) {
      jwtToken
    }
  }
`;
