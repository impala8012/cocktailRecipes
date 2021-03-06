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
import { LoadingContext, UserContext } from "../../contexts";
import { Loading } from "../index";

const Recipe = ({ recipeChange, setRecipeChange}) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
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

  const handleClick = () => async() => {
    try {
      await deleteRecipe(id)
      history.push("/recipes")
    } catch(err){
      console.log(err.message)
    }
  }

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
                {user === recipe.user_id ? (
                  <>
                    <RecipeNav>
                      <RecipeEdit
                        to={{
                          pathname: `/recipes/${recipe.recipe_id}/edit`,
                          state: { recipe: { recipe } },
                        }}
                      >
                        ??????
                      </RecipeEdit>
                      <RecipeDelete onClick={handleClick(id)}>
                        ??????
                      </RecipeDelete>
                    </RecipeNav>
                  </>
                ) : null}
              </RecipeHeader>
              <RecipeSubtitle>??????:{recipe.recipe_ingredient}</RecipeSubtitle>
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
