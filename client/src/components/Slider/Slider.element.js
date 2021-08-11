import styled from "styled-components"
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export const SliderContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "來杯屬於自己的調酒吧";
    position: absolute;
    font-size: 2rem;
    font-family: MicrosoftJhengHei;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const LeftArrow = styled(FaArrowAltCircleLeft)`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 768px) {
    left: 10px;
    font-size: 2.5rem;
  }
`;

export const RightArrow = styled(FaArrowAltCircleRight)`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 768px) {
    right: 10px;
    font-size: 2.5rem;
  }
`;


export const ImageContainer = styled.div`
  opacity: 0;
  transition: 10s ease;
  position: relative;

  ${({ active }) =>
    active === true &&
    `
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.03);
  `}
`;

export const Img = styled.img`
  width: 900px;
  height: 450px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 450px;
    height: 300px;
  }
`;


export const DotsContainer = styled.div`
  width: 10%;
  height: 10%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 80%;
  z-index: 200;
  @media screen and (max-width: 768px) {
    top: 70%;
    width:15%;
  }
`;

export const Dot = styled.span`
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  margin: 0 3px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: inline-block;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  ${({ active }) =>
    active === true &&
    `
  background-color: rgba(255,255,255,0.5);
 `}
`;