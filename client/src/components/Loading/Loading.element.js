import styled, { keyframes } from "styled-components"
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
    to {
        transform: rotate(360deg);
    }
`;
export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #151515; */
  background-color: #efefef;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
  }

  &:before {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, #ff00cc 0%, #333399 100%);
    animation: ${spin} 0.5s infinite linear;
  }

  &:after {
    width: 90%;
    height: 90%;
    background-color: #efefef;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SpinnerText = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;