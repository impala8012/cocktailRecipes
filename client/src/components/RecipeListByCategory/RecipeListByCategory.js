import React, { useState, useEffect, useContext } from "react";
import {
  Wrapper,
  RecipeItem,
  RecipeImageContainer,
  RecipeImage,
  RecipeItemText,
  RecipeItemTitle,
  RecipeItemSubTitle,
  RecipeItemReadmore,
  Categoryitem,
  CategoryTitle,
} from "./RecipeListByCategory.element";
import { getRecipeListByCategoryId } from "../../WebApi";
import { useParams,useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";

const RecipeListByCategory = () => {
  const [recipes, setRecipes] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const { id } = useParams();
  const location = useLocation();
  const category = location.state.category;
  // console.log("category", category);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getRecipeListByCategoryId(id);
      console.log(
        "response from recipelist by category",
        response.categoryRecipesList
      );
      // const recipeArr = response.categoryRecipesList.reduce(
      //   (accumulator, currentValue, currentIndex, array) => {
      //     if (currentIndex % 2 === 0)
      //       accumulator.push(array.slice(currentIndex, currentIndex + 2));
      //     return accumulator;
      //   },
      //   []
      // );
      // const test = recipeArr.map((recipe) => {
      //   return console.log("recipe 0 item", recipe[0].recipe_image_url);
      // });
      // console.log("recepeArr", recipeArr);
      setRecipes(response.categoryRecipesList);
      setIsLoading(false);
    };
    fetchData();
  }, [id, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Categoryitem>
            <CategoryTitle>{category}</CategoryTitle>
          </Categoryitem>
          {recipes.map((recipe, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <div key={index}>
                  <RecipeItem>
                    <RecipeImageContainer>
                      <RecipeImage src={recipe.recipe_image_url} />
                    </RecipeImageContainer>
                    <RecipeItemText>
                      <RecipeItemTitle>{recipe.recipe_title}</RecipeItemTitle>
                      <RecipeItemSubTitle>
                        {recipe.recipe_ingredient}
                      </RecipeItemSubTitle>
                      <RecipeItemReadmore to={`/recipes/${recipe.recipe_id}`}>
                        作法
                      </RecipeItemReadmore>
                    </RecipeItemText>
                  </RecipeItem>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <RecipeItem>
                    <RecipeItemText>
                      <RecipeItemTitle>{recipe.recipe_title}</RecipeItemTitle>
                      <RecipeItemSubTitle>
                        {recipe.recipe_ingredient}
                      </RecipeItemSubTitle>
                      <RecipeItemReadmore to={`/recipes/${recipe.recipe_id}`}>
                        作法
                      </RecipeItemReadmore>
                    </RecipeItemText>
                    <RecipeImageContainer>
                      <RecipeImage src={recipe.recipe_image_url} />
                    </RecipeImageContainer>
                  </RecipeItem>
                </div>
              );
            }
          })}
        </Wrapper>
      )}
    </>
  );
};

export default RecipeListByCategory;
