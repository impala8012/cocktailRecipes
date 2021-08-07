import React, { useState, useEffect } from "react";
import {
  SliderContainer,
  LeftArrow,
  RightArrow,
  ImageContainer,
  Img,
  DotsContainer,
  Dot
} from "./Slider.element";
import { sliderData } from "./Data";
console.log("sliderData", sliderData);

const length = sliderData.length;

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log("activeIndex", activeIndex);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () =>
    setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1);
  const prevSlide = () =>
    setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1);

  const handeClick = (idx) => {
    setActiveIndex(idx);
  };

  return (
    <SliderContainer>
      <LeftArrow onClick={prevSlide} />
      <RightArrow onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <ImageContainer
            active={index === activeIndex ? true : false}
            key={index}
          >
            {index === activeIndex && <Img alt="image" src={slide.image} />}
          </ImageContainer>
        );
      })}
      <DotsContainer>
        {Array.from({length:3}).map((item, index)=>{
          return (
            <Dot
              key={index}
              active={activeIndex === index ? true : false}
              onClick={() => handeClick(index)}
            ></Dot>
          );
        })}
      </DotsContainer>
    </SliderContainer>
  );
};

export default Slider;
