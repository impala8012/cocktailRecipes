import styled from "styled-components"
import { CustomButton } from "../../globalStyle";
import { Link } from "react-router-dom";

export const SignInContianer = styled.div`
  margin: 50px auto;
  width: 380px;
  display: flex;
  flex-direction: column;
`;
export const SignInForm = styled.form``;
export const SignInTitle = styled.h2`
  margin: 10px 0;
`;
export const SignInButton = styled(CustomButton)``;
export const SignUpMessage = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;
export const SignUpInfo = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  margin-left: 10px;
`;

export const ErrorMessage = styled.div`
  color: #756e15;
  background: #fffbd1;
  border: 1px solid #87803e;
  text-align: center;
  transition: opacity 2s;

  ${({ fadeOut }) =>
    fadeOut === true &&
    `
     opacity: 0;
     transition: opacity 2s;
     height: 26px;

  `};
`;
