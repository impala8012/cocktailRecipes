import React, { useState } from "react";
import {
  AddRecipeContainer,
  AddRecipeSection,
  AddRecipeTitle,
  AddRecipeForm,
  AddRecipeLabel,
  AddRecipeDivider,
  AddRecipeInput,
  AddRecipeTextarea,
  AddRecipeSelectDivider,
  AddRecipeSelect,
  AddRecipeSelectOption,
  AddRecipeButton,
  AddRecipeImgPreview,
  ImgPreview,
  AddRecipeimgInput,
  ImgLabel,
  ImgLabelContainer,
} from "./AddRecipe.element";
import {AiFillPicture} from "react-icons/ai"

const AddRecipe = () => {
  const [value, setValue] = useState({
    title: "",
    ingredient: "",
    content: "",
  });
  const [img, setImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const { title, ingredient, content } = value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
  };

  const handleImageChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () =>{
      if (reader.readyState === 2) {
        console.log("reader.result", reader.result);
        setImg(reader.result);
      }
    }
    reader.readAsDataURL(file);
  }
  const categoryList = ["Gin", "Rum"];
  return (
    <AddRecipeContainer>
      <AddRecipeSection>
        <AddRecipeTitle>新增文章</AddRecipeTitle>

        <AddRecipeForm onSubmit={handleSubmit}>
          <AddRecipeDivider>
            <AddRecipeLabel>文章標題：</AddRecipeLabel>
            <AddRecipeInput
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
          </AddRecipeDivider>

          <AddRecipeDivider>
            <AddRecipeLabel>材料：</AddRecipeLabel>
            <AddRecipeTextarea
              type="text"
              cols="15"
              rows="2"
              name="ingredient"
              onChange={handleChange}
              value={ingredient}
              required
            ></AddRecipeTextarea>
          </AddRecipeDivider>
          <AddRecipeSelectDivider>
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
          <AddRecipeDivider>
            <AddRecipeImgPreview>
              <ImgPreview src={img} />
            </AddRecipeImgPreview>
            <ImgLabelContainer>
              <ImgLabel>
                <AddRecipeimgInput
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <AiFillPicture />
                來張成品圖吧
              </ImgLabel>
            </ImgLabelContainer>
          </AddRecipeDivider>
          <AddRecipeDivider>
            <AddRecipeLabel>文章內容：</AddRecipeLabel>
            <AddRecipeTextarea
              className="input-textarea"
              cols="30"
              rows="5"
              name="content"
              onChange={handleChange}
              value={content}
              required
            ></AddRecipeTextarea>
          </AddRecipeDivider>
          <AddRecipeButton>送出</AddRecipeButton>
        </AddRecipeForm>
      </AddRecipeSection>
    </AddRecipeContainer>
  );
};

export default AddRecipe;
