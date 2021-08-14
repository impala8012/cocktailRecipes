import React, { useState, useEffect } from "react";
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
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllRecipes();
      console.log(response);
      setRecipes(response);
    };
    fetchData();
  }, []);
  return (
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
                <RecipeListBodyDescContent>
                  {recipe.recipe_content}
                </RecipeListBodyDescContent>
              </RecipeListBodyDesc>
              <RecipeListBodyDesc>3</RecipeListBodyDesc>
              <RecipeListBodyDesc>{recipe.category}</RecipeListBodyDesc>
            </RecipeListBodyRow>
          );
        })}
      </RecipeListBody>
    </RecipeListContainer>
  );
};

export default RecipeList;
