import React from 'react'
import { Wrapper, Span } from "./TextAnimation.element";

const TextAnimation = () => {
  const textArray = "來杯屬於自己的調酒吧".split("");
  return (
    <Wrapper>
      {textArray.map((text, index) => {
        return <Span key={index}>{text}</Span>;
      })}
    </Wrapper>
  );
}

export default TextAnimation
