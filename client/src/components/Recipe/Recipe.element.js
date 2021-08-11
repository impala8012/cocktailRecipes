import styled from "styled-components";
import {Container} from "../../globalStyle"

export const RecipeContainer = styled(Container)`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 70%;
  margin: 30px auto;
  background: blue;
  padding: 30px; ;
`;

export const RecipeImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`

export const RecipeImg = styled.img`
  width: 70%;
`;

export const RecipeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecipeTitle = styled.h2``

export const RecipeSubtitle = styled.p`
  margin-top: 17px;
  white-space: pre-line;
  word-break: break-all;
  line-height: 1.5em;
`;
export const RecipeDesc = styled.p`
  margin-top: 17px;
  white-space: pre-line;
  word-break: break-all;
  line-height: 1.5em;
  border: 1px solid #bdbdbd;
  height: 100vh;
  padding: 10px;
`;