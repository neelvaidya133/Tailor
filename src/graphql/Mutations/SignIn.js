import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;
