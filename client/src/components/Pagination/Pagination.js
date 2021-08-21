import React from 'react'
import { PaginationContainer,Page,PageLink } from "./Pagination.element";
const Pagination = ({ per_page, totalRecipes, setPage }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalRecipes / per_page); i++) {
    pageNumber.push(i);
  }
  return (
    <PaginationContainer>
      {pageNumber.map((number) => {
        return (
          <Page key={number}>
            <PageLink onClick={() => setPage(number)} className="page-link">
              {number}
            </PageLink>
          </Page>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination
