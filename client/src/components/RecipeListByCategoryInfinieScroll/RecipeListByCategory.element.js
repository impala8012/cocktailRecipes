import styled from "styled-components";
import {Link} from "react-router-dom"

export const Wrapper = styled.div`
  width: 60%;
  margin: 30px auto;
  @media screen and (max-width: 820px) {
    width: 80%;
    height: 80%;
  }
`;

export const RecipeItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 70px;

  & > :first-child {
    margin-right: -10%;
  }
  @media screen and (max-width: 820px) {
    & > :first-child {
      margin-right: -5%;
    }
  }
`;
export const RecipeImageContainer = styled.div`
  /* width: 55%; */
  width: 500px;
  height: 350px;
  flex-shrink: 0;
  @media screen and (max-width: 820px) {
    width: 250px;
    height: 250px;
  }
`;
export const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
`;
export const RecipeItemText = styled.div`
  width: 55%;
  flex-shrink: 0;
  padding: 50px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background-color: rgba(254, 201, 121, 0.7);
  @media screen and (max-width: 820px) {
    padding: 30px 10px;
  }
`;
export const RecipeItemTitle = styled.h2`
`;
export const RecipeItemSubTitle = styled.p`
  margin: 10px 0;
  @media screen and (max-width: 820px) {
    font-size: 14px;
  }
`;
export const RecipeItemReadmore = styled(Link)`
  color: #fff;
  border: 1px solid #efefef;
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 5px 20px 5px 20px;
  margin-top: 10px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bolder;
  cursor: pointer;
`;

export const Categoryitem = styled.div`
  /* display: flex; */
  margin-bottom: 70px;
  border-bottom: 2px solid #efefef;
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 5px 20px 5px 20px;
  margin-top: 10px;
  font-size: 1rem;
  display:flex;
  justify-content: center;
`;

export const CategoryTitle = styled.h1`
  /* color: #fff;
  border: 1px solid #efefef;
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 5px 20px 5px 20px;
  margin-top: 10px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bolder;
  cursor: pointer; */
`;
