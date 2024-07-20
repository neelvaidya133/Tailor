import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
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
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  margin: 20px 0;
  width: 50%;
  background-color: #1677ff;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #1356d2;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  height: 100vh;
  width: 100%;
`;

export const Wraper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 80%;
  width: 80%;

  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid lightgray;
    border-radius: 5px;
    outline: none;
    width: 50%;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
`;
export const SelectRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
`;
export const SelectLeft = styled.div`
  width: 50%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
