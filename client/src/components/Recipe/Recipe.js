import React, { useState, useEffect, useContext } from "react";
import parse from "html-react-parser";
import {
  RecipeContainer,
  RecipeImgContainer,
  RecipeImg,
  RecipeContentContainer,
  RecipeTitle,
  RecipeSubtitle,
  RecipeDesc,
  RecipeHeader,
  RecipeDelete,
  RecipeEdit,
  RecipeNav,
} from "./Recipe.element";
import { useParams, useHistory } from "react-router-dom";
import { getRecipe,deleteRecipe } from "../../WebApi";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";

const Recipe = ({ recipeChange, setRecipeChange}) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  // var plainString = htmlString.replace(/<[^>]+>/g, "");
  let history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await getRecipe(id);
      // console.log("response from recipe", response);
      // const comment = await getComments(id);
      // console.log("response from comment", comment);
      // setComments(comment);
      setRecipe(response);
      setIsLoading(false);
      setRecipeChange(false);
    };
    fetchData();
  }, [id, setIsLoading, recipeChange, setRecipeChange]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     const comment = await getComments(id);
  //     console.log("response from comment", comment);
  //     setComments(comment);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [id, setIsLoading]);
  const handleClick = () => async() => {
    try {
      await deleteRecipe(id)
      history.push("/recipes")
    } catch(err){
      console.log(err.message)
    }
  }

  console.log("recipe from recipe", recipe.recipe_id)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <RecipeContainer>
            <RecipeImgContainer>
              <RecipeImg src={recipe.recipe_image_url} />
            </RecipeImgContainer>
            <RecipeContentContainer>
              <RecipeHeader>
                <RecipeTitle>{recipe.recipe_title}</RecipeTitle>
                <RecipeNav>
                  <RecipeEdit
                    to={{
                      pathname: `/recipes/${recipe.recipe_id}/edit`,
                      state: { recipe: { recipe } },
                    }}
                  >
                    編輯
                  </RecipeEdit>
                  <RecipeDelete onClick={handleClick(id)}>刪除</RecipeDelete>
                </RecipeNav>
              </RecipeHeader>
              <RecipeSubtitle>材料:{recipe.recipe_ingredient}</RecipeSubtitle>
              <RecipeDesc>{parse(`${recipe.recipe_content}`)}</RecipeDesc>
            </RecipeContentContainer>
          </RecipeContainer>
          {/* <AddComment setRecipeChange={setRecipeChange} />
          <Comments
            allComments={comments}
            setAllComments={setComments}
            isLoading={isLoading}
          /> */}
        </>
      )}
    </>
  );
};

export default Recipe;
