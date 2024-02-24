import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
export const Label = styled.label`
  margin-top: 10px;
`;
export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;
export const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: blue;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

export const ErrorMessages = styled.p`
  margin: 0 0;
  padding: 0;
  color: red;
`;
