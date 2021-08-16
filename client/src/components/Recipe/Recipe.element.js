import styled from "styled-components";
import { Container } from "../../globalStyle";

export const RecipeContainer = styled(Container)`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 30px auto;
  padding: 15px;
  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const RecipeImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 300px;
  margin: auto 40px 0 0;
  @media screen and (max-width: 820px) {
    width: 80%;
    margin: 0 0 10px 0;
  }
`;

export const RecipeImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const RecipeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecipeTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

export const RecipeSubtitle = styled.p`
  margin-top: 17px;
  white-space: pre-line;
  word-break: break-all;
  line-height: 1.5em;
`;
export const RecipeDesc = styled.div`
  margin-top: 17px;
  white-space: pre-line;
  word-break: break-all;
  line-height: 1.5em;
  border: 1px solid #bdbdbd;
  padding: 10px;
`;
