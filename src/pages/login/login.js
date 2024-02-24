import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContainer, LoginForm, Input, Button } from "./loginStyle";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { SIGNIN_MUTATION } from "../../graphql/Mutations/Index";
import { jwtDecode } from "jwt-decode";

import GetCompanyData from "../../graphql/Queries/GetCompanyData";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signin }) {
      console.log("signin", signin);
      if (signin?.jwtToken) {
        Cookies.set("jwtToken", signin.jwtToken);

        const decoded = jwtDecode(signin.jwtToken);
        console.log("decoded", decoded);
        Cookies.set("user_id", JSON.stringify(decoded.user_id));

        navigate("/registerShop");
      } else {
        setAuthError("Invalid Credentials");
      }
    },
    onError(error) {
      setAuthError("Invalid Credentials");
    },
  });
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signin({
      variables: {
        email: login.username,
        password: login.password,
      },
    });
  };
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Login
        </h1>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
        {authError !== null ? (
          <p style={{ color: "red" }}>{authError}</p>
        ) : null}
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
