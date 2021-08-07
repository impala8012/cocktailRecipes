import React from 'react'
import { DotsContainer, Dot } from "./Dots.element";

const Dots = ({ activeIndex, onClick, sliderData }) => {
  return (
    <DotsContainer>
      {sliderData.map((slide, index) => {
        <Dot
          key={index}
          active={activeIndex === index ? true : false}
          onClick={onClick(index)}
        ></Dot>;
      })}
    </DotsContainer>
  );
}



export default Dots
