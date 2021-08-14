import React,{useState, useEffect} from 'react'
import {
  HomeRecipeContainer,
  RecipeImgWrapper,
  RecipeImg,
  RecipeInfo,
  RecipeTitle,
} from "./HomeRecipeList.element";

const HomeRecipeList = () => {
  const [recipes, setRecipes] = useState([])
  // const getTop10Recipe = async() => {
  //   try {
  //     const response = await fetch("http://localhost:5000/recipes",{
  //       method: "GET",
  //     })
  //     const jsonData = await response.json()
  //     setRecipes(jsonData)
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }
  // useEffect(()=>{
  //   getTop10Recipe()
  // },[])
  return (
    <div>
      <HomeRecipeContainer>
        {/* {recipes.map((recipe, index) => { */}
        {/* return ( */}
        <RecipeImgWrapper>
          <RecipeImg
            alt="image"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ja3RhaWxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
          />
          <RecipeInfo>
            <RecipeTitle>我是 title</RecipeTitle>
          </RecipeInfo>
        </RecipeImgWrapper>
        <RecipeImgWrapper>
          <RecipeImg
            alt="image"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ja3RhaWxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
          />
          <RecipeInfo>
            <RecipeTitle>我是 title</RecipeTitle>
          </RecipeInfo>
        </RecipeImgWrapper>
        <RecipeImgWrapper>
          <RecipeImg
            alt="image"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ja3RhaWxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
          />
          <RecipeInfo>
            <RecipeTitle>我是 title</RecipeTitle>
          </RecipeInfo>
        </RecipeImgWrapper>
        {/* ); */}
        {/* })} */}
      </HomeRecipeContainer>
    </div>
  );
}

export default HomeRecipeList;
