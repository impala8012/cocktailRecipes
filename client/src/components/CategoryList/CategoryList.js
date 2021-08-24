import React, { useState, useEffect, useContext } from "react";
import {
  CategoryListContainer,
  Wrapper,
  CategoryListHeadRow,
  CategoryListHeadInfo,
  CategoryListBody,
  CategoryListBodyRow,
  CategoryListBodyDesc,
  CategoryListBodyDescTitle,
  CategoryListBodyDescContent,
  CategoryListHead,
} from "./CategoryList.element";

import { getCategories } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getCategories();
      // console.log("my res", response);
      setCategories(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [setIsLoading]);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <CategoryListContainer>
          <CategoryListHead>
            <CategoryListHeadRow>
              <CategoryListHeadInfo>分類</CategoryListHeadInfo>
              <CategoryListHeadInfo>文章</CategoryListHeadInfo>
            </CategoryListHeadRow>
          </CategoryListHead>
          <CategoryListBody>
            {categories.length !== 0 &&
              categories.map((category) => {
                return (
                  <CategoryListBodyRow key={category.category_id}>
                    <CategoryListBodyDesc>
                      <CategoryListBodyDescTitle
                        to={{
                          pathname: `/categories/${category.category_id}`,
                          state: { category: `${category.category}` },
                        }}
                        category={category.category}
                      >
                        {category.category}
                      </CategoryListBodyDescTitle>
                      <CategoryListBodyDescContent>
                        {category.category_desc}
                      </CategoryListBodyDescContent>
                    </CategoryListBodyDesc>
                    <CategoryListBodyDesc>
                      {category.recipes_count ? category.recipes_count : 0}
                    </CategoryListBodyDesc>
                  </CategoryListBodyRow>
                );
              })}
          </CategoryListBody>
        </CategoryListContainer>
      )}
    </Wrapper>
  );
};

export default CategoryList;
