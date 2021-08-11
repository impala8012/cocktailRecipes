import styled from "styled-components";

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
  vertical-align: inherit;
  padding: 10px;
  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
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
`;

export const RecipeListBodyDescTitle = styled.span`
  font-weight: bold;
`;

export const RecipeListBodyDescContent = styled.a`
  font-size: 16px;
`;
