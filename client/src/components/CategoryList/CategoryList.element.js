import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  height: auto;
`
export const CategoryListContainer = styled.div`
  width: 50%;
  margin: 20px auto 100px auto;
  display: table;
  border-collapse: collapse;
  @media screen and (max-width: 820px) {
    width: 90%;
  }
`;
export const CategoryListHead = styled.div`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const CategoryListHeadRow = styled.div`
  display: table-row;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px ridge #bdbdbd;
  @media screen and (max-width: 820px) {
    font-size: 1rem;
  }
`;

export const CategoryListHeadInfo = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 10px;
  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
  }
  @media screen and (max-width: 820px) {
    &:first-child {
      vertical-align: bottom;
    }
  }
`;
export const CategoryListBody = styled.div`
  display: table-row-group;
`;
export const CategoryListBodyRow = styled.div`
  display: table-row;
  border-bottom: 1px solid #bdbdbd;
`;
export const CategoryListBodyDesc = styled.div`
  display: table-cell;
  vertical-align: inherit;
  padding: 10px;
  &:first-child {
    width: 550px;
    display: flex;
    flex-direction: column;
    line-height: 1.5rem;
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
export const CategoryListBodyDescTitle = styled(Link)`
  width: 10%;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:visited {
    text-decoration: none;
    color: black;
  }
`;
export const CategoryListBodyDescContent = styled.div`
  font-size: 16px;
`;
