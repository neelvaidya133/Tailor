import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;
export const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
`;
export const SignupLeft = styled.div`
  width: 50%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
export const SignupRight = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const InputWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;
export const Button = styled.button`
  padding: 10px 10px;
  margin-top: 10px;
  width: 100%;
  background-color: #1677ff;
  color: white;
  font-size: 14px;
  border-radius: 5px;

  border: none;
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
