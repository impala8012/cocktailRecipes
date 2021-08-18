import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { IconContext } from "react-icons";
const Star = ({rating}) => {
  let stars = []
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <BsStarFill key={i} stroke="currentColor" color={"#ffc107"} />
        );
      } else {
        stars.push(<BsStar key={i} stroke="currentColor" color={"#e4e5e9"} />);
      }
    }
  return (
      <div>{stars}</div>
  );
}

export default Star
