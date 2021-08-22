import React, { useState, useEffect, useContext, useRef } from "react";
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
} from "./UserRecipes.element";
import { getRecipe, getUserRecipes } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const per_page = 10;
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await getUserRecipes();
        console.log("response from user recipes", response);
        setRecipes(response);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err.message);
      }
    };
    fetchData();
  }, [setIsLoading, per_page, page]);

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
        </>
      )}
    </>
  );
};

export default UserRecipes;
