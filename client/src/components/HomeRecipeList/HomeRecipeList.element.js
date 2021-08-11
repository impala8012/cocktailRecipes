import styled from "styled-components"

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
  top: 34%;
  left: 10%;
  width: 80%;
  height: 65%;
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
  margin-bottom: 10px;

  &:hover ${RecipeInfo} {
    opacity: 1;
    transform: scale(1);
    transition: 1s;
  }
`;


export const RecipeTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.4em;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;