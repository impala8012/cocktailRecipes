import styled from "styled-components";
import { CustomButton } from "../../globalStyle";

export const SignUpContainer = styled.div`
  margin: 50px auto;
  width: 380px;
  display: flex;
  flex-direction: column;
`;
export const SignUpTitle = styled.h2`
  margin: 10px 0;
`;
export const SignUpForm = styled.form`
  display: relative;
`;
export const SignUpBotton = styled(CustomButton)``;

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
