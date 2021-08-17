import styled from "styled-components";
import { Link } from "react-router-dom";

export const RecipeListContainer = styled.div`
  width: 60%;
  height: 100vh;
  margin: 30px auto;
  display: table;
  border-collapse: collapse;
`;

export const RecipeListHead = styled.div`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const RecipeListHeadRow = styled.div`
  display: table-row;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px ridge #bdbdbd;
`;

export const RecipeListHeadInfo = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 10px;
  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
  }
  @media screen and (max-width: 820px) {
    &:first-child {
      /* text-align: bottom; */
      writing-mode: vertical-lr;
      vertical-align: top;
      padding-top:60px;
    }
  }
`;

export const RecipeListBody = styled.div`
  display: table-row-group;
`;

export const RecipeListBodyRow = styled.div`
  display: table-row;
  border-bottom: 1px solid #bdbdbd;
`;

export const RecipeListBodyDesc = styled.div`
  display: table-cell;
  vertical-align: inherit;
  padding: 10px;
  &:first-child {
    width: 500px;
    display: flex;
    flex-direction: column;
  }

  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
  }
  @media screen and (max-width: 820px) {
    &:first-child {
      width: 400px;
    }
  }
`;

export const RecipeListBodyDescTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const RecipeListBodyDescContent = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: #6f6e75;
  margin-top: 5px;
`;
;

export const RecipeListBodyDescContentCategory = styled(RecipeListBodyDescContent)`
  font-weight: bold;
  font-size: 1rem;
`;