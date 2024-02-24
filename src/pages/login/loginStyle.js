import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

export const SignupLink = styled.a`
  color: blue;
  text-decoration: none;
  cursor: pointer;
`;
