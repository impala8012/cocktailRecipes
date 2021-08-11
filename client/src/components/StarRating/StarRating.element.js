import styled from "styled-components";
import { FaStar } from "react-icons/fa";

export const StarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const RadioInput = styled.input.attrs({
  type: "radio",
  name: "rating",
})`
  display: none;
`;

export const Star = styled(FaStar)`
  cursor: pointer;
  transition: color 200ms;
`;
