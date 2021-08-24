import React, { useState, useEffect, useContext } from "react";
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
  Wrapper,
  NoRecipesInfo,
  AddRecipeLink,
} from "./UserRecipes.element";
import { getUserRecipes } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";
import { HiCursorClick } from "react-icons/hi";
const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
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
  }, [setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {recipes.length === 0 ? (
            <>
              <Wrapper>
                <NoRecipesInfo>目前還未發布任何一篇文章呦</NoRecipesInfo>
                <AddRecipeLink to="/add-recipe">
                  來立刻發表自己的酒譜吧
                  <HiCursorClick />
                </AddRecipeLink>
              </Wrapper>
            </>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default UserRecipes;
