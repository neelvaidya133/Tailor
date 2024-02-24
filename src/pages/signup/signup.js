import React from "react";
import {
  Button,
  Input,
  SignUpContainer,
  SignUpForm,
  ErrorMessages,
  Label,
} from "./signupStyle";
import { useState } from "react";
import validateSignup from "../../utils/formValidation";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../graphql/Mutations/Index";

const Signup = () => {
  const [signup, setSignup] = useState({});
  const [error, setError] = useState({});
  const [signupUser] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signup }) {
      console.log("signup", signup);
    },
    onError: (error) => {
      if (error.message.includes("users_email_key")) {
        setError({ ...error, email: "Email is already registered" });
      }
      if (error.message.includes("users_phone_key")) {
        setError({ ...error, phone: "Phone is already registered" });
      }

      console.log("error", error);
    },
  });

  const handleChnage = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(signup);
    setError(validationErrors);
    console.log(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;
    console.log(isValid);
    if (isValid) {
      signupUser({
        variables: {
          inputName: signup.name,
          inputEmail: signup.email,
          inputPassword: signup.password,
          inputPhone: signup.phone,
        },
      });
      console.log("signup", signup);
    } else {
      console.log("okokokokok", error);
    }
  };

  return (
    <>
      <SignUpContainer>
        <SignUpForm onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name_input"
            placeholder="Name"
            onChange={handleChnage}
          />
          {error.name_input && (
            <ErrorMessages>{error.name_input}</ErrorMessages>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChnage}
          />
          {error.email && <ErrorMessages>{error.email}</ErrorMessages>}
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChnage}
          />
          {error.password && <ErrorMessages>{error.password}</ErrorMessages>}
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChnage}
          />
          {error.confirmPassword && (
            <ErrorMessages>{error.confirmPassword}</ErrorMessages>
          )}
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="number"
            name="phone"
            placeholder="Phone"
            onChange={handleChnage}
          />
          {error.phone && <ErrorMessages>{error.phone}</ErrorMessages>}
          <Button type="submit">Sign Up</Button>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </SignUpForm>
      </SignUpContainer>
    </>
  );
};

export default Signup;
