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
} from "./RecipeList.element";
import { getAllRecipes } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getAllRecipes();
      console.log(response);
      setRecipes(response);
      setIsLoading(false);
    };
    fetchData();
  }, [setIsLoading]);
  return (
    <>
      {isLoading ? (
        <Loading />
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
                  <RecipeListBodyDesc>3</RecipeListBodyDesc>
                  <RecipeListBodyDesc>{recipe.category}</RecipeListBodyDesc>
                </RecipeListBodyRow>
              );
            })}
          </RecipeListBody>
        </RecipeListContainer>
      )}
    </>
  );
};

export default RecipeList;
