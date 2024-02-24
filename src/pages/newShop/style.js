import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ShopRegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const ShopForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 20px;
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

export const Error = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
`;
