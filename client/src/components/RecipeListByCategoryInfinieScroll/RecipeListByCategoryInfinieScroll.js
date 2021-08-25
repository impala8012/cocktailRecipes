import React, { useState, useEffect, useContext, useRef } from "react";
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
import {
  getRecipeListByCategoryIdWithPagination,
  getRecipeListByCategoryId,
} from "../../WebApi";
import { useParams,useLocation } from "react-router-dom";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";

const RecipeListByCategoryInfinieScroll = () => {
  const [recipes, setRecipes] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalLength, setTotalLength] = useState();

  const per_page = 2;

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  const { id } = useParams();
  const location = useLocation();
  const category = location.state.category;

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      const data = await getRecipeListByCategoryId(id);
      setTotalLength(data.categoryRecipesList.length);
      const newRecipe = await getRecipeListByCategoryIdWithPagination(
        id,
        per_page,
        page
      );
      // console.log("newRecipe", newRecipe);
      setRecipes((prev) => [...prev, ...newRecipe.categoryRecipesList]);
      setIsLoading(false);
      setHasMore(true);
    };
    loadRecipes();
  }, [id, page, setIsLoading]);

  const pageEnd = useRef()
  let totalPages = Math.ceil(totalLength / per_page)
  let num = 1;
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= totalPages) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [hasMore, num, totalPages]);
  return (
    <>
      {isLoading && <Loading />}
      <Wrapper>
        <Categoryitem>
          <CategoryTitle>{category}</CategoryTitle>
        </Categoryitem>
        {
          recipes.map((recipe, index) => {
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
      <div ref={pageEnd}></div>
    </>
  );
};

export default RecipeListByCategoryInfinieScroll;
