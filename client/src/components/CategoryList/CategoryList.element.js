import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  height: 70vh;
`
export const CategoryListContainer = styled.div`
  width: 60%;
  margin: 50px auto 100px auto;
  display: table;
  border-collapse: collapse;
`;
export const CategoryListHead = styled.div`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const CategoryLists = styled.div`
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #9a9a9a;
  font-size: 14px;
  width: 920px;
`;

export const CategoryTitle = styled.div`
  font-size: 16px;
  margin-left: 16px;
`;

export const CategoryListHeadRow = styled.div`
  display: table-row;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px ridge #bdbdbd;
`;

export const CategoryListHeadInfo = styled.div`
  display: table-cell;
  vertical-align: inherit;
  padding: 10px;
  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
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
    width: 500px;
    display: flex;
    flex-direction: column;
  }

  &:not(:first-child) {
    text-align: center;
    vertical-align: middle;
  }
`;
export const CategoryListBodyDescTitle = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;
export const CategoryListBodyDescContent = styled.div`
  font-size: 16px;
`;
