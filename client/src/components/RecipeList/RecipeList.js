import React, { useState, useEffect,useContext } from "react";
import {
  RecipeListContainer,
  RecipeListHeadRow,
  RecipeListHeadInfo,
  RecipeListBody,
  RecipeListBodyRow,
  RecipeListBodyDesc,
  RecipeListBodyDescTitle,
  RecipeListBodyDescContent,
  RecipeListBodyDescContentCategory,
} from "./RecipeList.element";
import { getAllRecipes, getAllRecipesPagenation } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading,Pagination } from "../index";
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1)
  const per_page = 10;
  const [totalLength, setTotalLength] = useState()
  // const totalRecipes = recipes.length
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const totalLength = await getAllRecipes(per_page, page);
      setTotalLength(totalLength.length);
      const response = await getAllRecipesPagenation(per_page, page);
      console.log(response);
      setRecipes(response);
      setIsLoading(false);
    };
    fetchData();
  }, [setIsLoading, per_page,page]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <RecipeListContainer>
            <RecipeListHeadRow>
              <RecipeListHeadInfo>主題</RecipeListHeadInfo>
              <RecipeListHeadInfo>留言數</RecipeListHeadInfo>
              <RecipeListHeadInfo>分類</RecipeListHeadInfo>
            </RecipeListHeadRow>
            <RecipeListBody>
              {recipes.map((recipe, index) => {
                return (
                  <RecipeListBodyRow key={index}>
                    <RecipeListBodyDesc>
                      <RecipeListBodyDescTitle>
                        {recipe.recipe_title}
                      </RecipeListBodyDescTitle>
                      <RecipeListBodyDescContent
                        to={`/recipes/${recipe.recipe_id}`}
                      >
                        {recipe.recipe_ingredient.replace(/<[^>]+>/g, "")}
                      </RecipeListBodyDescContent>
                    </RecipeListBodyDesc>
                    <RecipeListBodyDesc>
                      {recipe.comments_count ? recipe.comments_count : 0}
                    </RecipeListBodyDesc>
                    <RecipeListBodyDesc>
                      <RecipeListBodyDescContentCategory
                        to={{
                          pathname: `/categories/${recipe.category_id}`,
                          state: { category: `${recipe.category}` },
                        }}
                      >
                        {recipe.category}
                      </RecipeListBodyDescContentCategory>
                    </RecipeListBodyDesc>
                  </RecipeListBodyRow>
                );
              })}
            </RecipeListBody>
          </RecipeListContainer>
          <Pagination
            setPage={setPage}
            totalRecipes={totalLength}
            per_page={per_page}
          />
        </>
      )}
    </>
  );
};

export default RecipeList;
