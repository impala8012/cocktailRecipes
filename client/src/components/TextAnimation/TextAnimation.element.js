import styled, { keyframes } from "styled-components";


const animation = keyframes`
  0% {opacity:0; transform:translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px)}
  25% {opacity:1; transform:translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px)}
  75% {opacity:1; transform:translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px)}
  100% {opacity:0; transform:translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px)}
`
export const Span = styled.span`
  font-size: 2rem;
  font-family: MicrosoftJhengHei;
  font-weight: bold;
  color: #fff;
`;
export const Wrapper = styled.span`
  display: inline-block;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${Span} {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  ${Span}:nth-child(1) {
    animation-delay: 0.1s;
  }
  ${Span}:nth-child(2) {
    animation-delay: 0.2s;
  }
  ${Span}:nth-child(3) {
    animation-delay: 0.3s;
  }
  ${Span}:nth-child(4) {
    animation-delay: 0.4s;
  }
  ${Span}:nth-child(5) {
    animation-delay: 0.5s;
  }
  ${Span}:nth-child(6) {
    animation-delay: 0.6s;
  }
  ${Span}:nth-child(7) {
    animation-delay: 0.7s;
  }
  ${Span}:nth-child(8) {
    animation-delay: 0.8s;
  }
  ${Span}:nth-child(9) {
    animation-delay: 0.9s;
  }
  ${Span}:nth-child(10) {
    animation-delay: 1s;
  }
`;
