import styled from "styled-components"
import {Link} from "react-router-dom"

export const HomeRecipeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const RecipeImg = styled.img`
  width: 350px;
  height: 200px;
  border-radius: 10px;
`;

export const RecipeInfo = styled.div`
  position: absolute;
  top: 40%;
  left: 15%;
  width: 70%;
  height: 55%;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0);
  transition: 0.5s;
`;

export const RecipeImgWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 10px 15px 20px 15px;

  &:hover ${RecipeInfo} {
    opacity: 1;
    transform: scale(1);
    transition: 1s;
  }
  @media screen and (max-width: 768px) {
    margin: 0 10px 30px 10px;
  }
`;


export const RecipeTitle = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.4em;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;