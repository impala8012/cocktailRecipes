import React from 'react'
import {
  CategoryListContainer,
  Wrapper,
  CategoryLists,
  CategoryTitle,
  CategoryListHeadRow,
  CategoryListHeadInfo,
  CategoryListBody,
  CategoryListBodyRow,
  CategoryListBodyDesc,
  CategoryListBodyDescTitle,
  CategoryListBodyDescContent,
  CategoryListHead,
} from "./CategoryList.element";

const CategoryList = () => {
  return (
    <Wrapper>
      <CategoryListContainer>
        <CategoryListHead>
          <CategoryListHeadRow>
            <CategoryListHeadInfo>分類</CategoryListHeadInfo>
            <CategoryListHeadInfo>文章數</CategoryListHeadInfo>
          </CategoryListHeadRow>
        </CategoryListHead>
        <CategoryListBody>
          <CategoryListBodyRow>
            <CategoryListBodyDesc>
              <CategoryListBodyDescTitle to="/">琴酒</CategoryListBodyDescTitle>
              <CategoryListBodyDescContent>
                介紹琴酒的歷史
              </CategoryListBodyDescContent>
            </CategoryListBodyDesc>
            <CategoryListBodyDesc>3</CategoryListBodyDesc>
          </CategoryListBodyRow>
        </CategoryListBody>
      </CategoryListContainer>
    </Wrapper>
  );
}

export default CategoryList
