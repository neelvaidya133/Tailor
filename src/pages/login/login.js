import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { LoginContainer, LoginForm, Input, Button } from "./loginStyle";
import "./loginStyle.css";
import Logo from "../../assets/login.svg";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { SIGNIN_MUTATION } from "../../graphql/Mutations/Index";
import { jwtDecode } from "jwt-decode";
import { Spin, Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const LoginPage = (props) => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [signin] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signin }) {
      setIsLoading(false);
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

  const handleLogin = (e) => {
    console.log("login", e);
    setIsLoading(true);
    signin({
      variables: {
        email: e.email,
        password: e.password,
      },
    });
  };
  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    // <LoginContainer>
    //   <LoginForm onSubmit={handleLogin}>
    //     <h1
    //       style={{
    //         textAlign: "center",
    //       }}
    //     >
    //       Login
    //     </h1>
    //     <Input
    //       type="text"
    //       name="username"
    //       placeholder="Username"
    //       onChange={handleChange}
    //     />
    //     <Input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       onChange={handleChange}
    //     />
    //     <Button type="submit" onClick={handleLogin}>
    //       Login
    //     </Button>
    //     {authError !== null ? (
    //       <p style={{ color: "red" }}>{authError}</p>
    //     ) : null}
    //     <p>
    //       Don't have an account? <Link to="/signup">Signup</Link>
    //     </p>
    //   </LoginForm>
    // </LoginContainer>
    <div className="container">
      <div className="svgWrap">
        <img src={Logo} alt="logo" />
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {authError !== null ? (
          <p style={{ color: "red" }}>{authError}</p>
        ) : null}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
