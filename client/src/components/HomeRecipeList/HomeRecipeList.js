import React, { useState, useEffect, useContext } from "react";
import {
  HomeRecipeContainer,
  RecipeImgWrapper,
  RecipeImg,
  RecipeInfo,
  RecipeTitle,
} from "./HomeRecipeList.element";
import { getTop9Recipes } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";
import AOS from "aos";
import "aos/dist/aos.css";
const HomeRecipeList = () => {
  const [recipes, setRecipes] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getTop9Recipes();
      setRecipes(response);
      setIsLoading(false);
    };
    fetchData();
  }, [setIsLoading]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <HomeRecipeContainer>
          {recipes.map((recipe, index) => {
            return (
              <RecipeImgWrapper key={index} data-aos="flip-left">
                <RecipeImg alt="image" src={recipe.recipe_image_url} />
                <RecipeInfo>
                  <RecipeTitle to={`/recipes/${recipe.recipe_id}`}>
                    {recipe.recipe_title}
                  </RecipeTitle>
                </RecipeInfo>
              </RecipeImgWrapper>
            );
          })}
        </HomeRecipeContainer>
      )}
    </div>
  );
}

export default HomeRecipeList;
