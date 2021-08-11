import React from 'react'
import {
  RecipeContainer,
  RecipeImgContainer,
  RecipeImg,
  RecipeContentContainer,
  RecipeTitle,
  RecipeSubtitle,
  RecipeDesc,
} from "./Recipe.element";

import Comments from "../Comments/Comments"
import AddComment from "../AddComment/AddComment";
import StarRating from "../StarRating/StarRating";

const Recipe = () => {
  return (
    <div>
      <RecipeContainer>
        <RecipeImgContainer>
          <RecipeImg src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ja3RhaWxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"/>
        </RecipeImgContainer>
        <RecipeContentContainer>
          <RecipeTitle>酒譜1</RecipeTitle>
          <RecipeSubtitle>材料:準備好久</RecipeSubtitle>
          <RecipeDesc>jfdkgkdhfkhsdkfsjfdsjhdifjlsdnfdchhkifjkgnjfdhjk</RecipeDesc>
        </RecipeContentContainer>
      </RecipeContainer>
      <AddComment />
      <Comments />
    </div>
  )
}

export default Recipe
