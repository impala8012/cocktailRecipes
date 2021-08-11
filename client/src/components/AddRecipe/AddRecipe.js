import React, { useState } from "react";
import {
  AddRecipeContainer,
  AddRecipeSection,
  AddRecipeTitle,
  AddRecipeForm,AddRecipeLabel,
  AddRecipeDivider,
  AddRecipeInputContent,
  AddRecipeTextareaContent,
  AddRecipeSelectDivider,
  AddRecipeSelect,
  AddRecipeSelectOption,
} from "./AddRecipe.element";


const AddRecipe = () => {
  const [value, setValue] = useState({
    title: "",
    ingredient: "",
    content: "",
  });
  const { title, ingredient, content } = value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
  };
  const categoryList = ["Gin", "Rum"];
  return (
    <AddRecipeContainer>
      <AddRecipeSection>
        <AddRecipeTitle>新增文章</AddRecipeTitle>

        <AddRecipeForm onSubmit={handleSubmit}>
          <ul>
            <AddRecipeDivider className="add-post__title">
              <AddRecipeLabel>文章標題</AddRecipeLabel>
              <AddRecipeInputContent
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                required
              />
            </AddRecipeDivider>
            <AddRecipeDivider className="add-post__author">
              <AddRecipeLabel>材料</AddRecipeLabel>
              <AddRecipeTextareaContent
                type="text"
                cols="15"
                rows="2"
                name="ingredient"
                onChange={handleChange}
                value={ingredient}
                required
              ></AddRecipeTextareaContent>
            </AddRecipeDivider>
            <AddRecipeSelectDivider className="add-post__category box">
              <AddRecipeLabel>分類：</AddRecipeLabel>
              <AddRecipeSelect
                name="category"
                className="select"
                onChange={handleChange}
              >
                {categoryList.map((category, index) => (
                  <AddRecipeSelectOption key={index} value={category}>
                    {category}
                  </AddRecipeSelectOption>
                ))}
              </AddRecipeSelect>
            </AddRecipeSelectDivider>
            <AddRecipeDivider className="add-post__content">
              <AddRecipeLabel className="theme--1">文章內容</AddRecipeLabel>
              <AddRecipeTextareaContent
                className="input-textarea"
                cols="30"
                rows="5"
                name="content"
                onChange={handleChange}
                value={content}
                required
              ></AddRecipeTextareaContent>
            </AddRecipeDivider>
          </ul>
          {/* <AddRecipeButton id={this.id} /> */}
        </AddRecipeForm>
      </AddRecipeSection>
    </AddRecipeContainer>
  );
};

export default AddRecipe;
