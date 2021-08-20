import React from 'react'
import { BsStarFill, BsStar } from "react-icons/bs";
const Star = ({rating}) => {
  // let floorRating = 1.5;
  // let avgRating = 1.5;
  // let stars = [];
  // for (let i = 0; i < 5; i++) {
  //   if (i < floorRating) {
  //     stars.push(<BsStarFill key={i} />);
  //   } else if (avgRating - i > 0 && avgRating - i < 1) {
  //     stars.push(<BsStarHalf key={i} />);
  //   } else {
  //     stars.push(<BsStar key={i} />);
  //   }
  // }
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
