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
import { TextAnimation } from "../index";
import {unsplashFoto} from "../../WebApi"


const Slider = () => {
  const [pics, setPics] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log("activeIndex", activeIndex);
  useEffect(()=>{
    const fetchData = async() => {
      const response = await unsplashFoto()
      console.log(response)
      setPics(response)
    }
    fetchData()
  },[])
  const length = pics.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, length]);

  const nextSlide = () =>
    setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1);
  const prevSlide = () =>
    setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1);

  const handeClick = (idx) => {
    setActiveIndex(idx);
  };

  return (
    <SliderContainer>
      <TextAnimation/>
      <LeftArrow onClick={prevSlide} />
      <RightArrow onClick={nextSlide} />
      {pics.map((pic, index) => {
        return (
          <ImageContainer
            active={index === activeIndex ? true : false}
            key={index}
          >
            {index === activeIndex && (
              <Img alt="image" src={pic.urls.regular} />
            )}
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
