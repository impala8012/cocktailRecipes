import React,{useState} from 'react'
import { StarContainer, RadioInput, Star } from "./StarRating.element";


const StarRating = ({ rating, setRating, handleClick }) => {
  // const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  // const handleClick = (e) => setRating(e.target.value);
  const handleMouseEnter = () => (ratingValue) => setHover(ratingValue);
  const handleMouseLeave = () => setHover(null);
  return (
    <StarContainer>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <RadioInput
              name="rating"
              value={ratingValue}
              onClick={handleClick}
            />
            <Star
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </label>
        );
      })}
    </StarContainer>
  );
};

export default StarRating
