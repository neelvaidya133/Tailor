import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: "https://tailorapi.onrender.com/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  console.log("operation", operation);
  if (
    operation.operationName !== "Signin" &&
    operation.operationName !== "Signup"
  ) {
    if (!Cookies.get("jwtToken")) {
      console.log("Redirecting to login");
      window.location.href = "/";
    }
    const token = Cookies.get("jwtToken");
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return forward(operation);
  } else {
    return forward(operation);
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
