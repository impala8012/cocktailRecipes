import React, { useState, useEffect } from "react";
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
  AddRecipeImgDivider,
  ErrorMessage,
} from "./EditRecipe.element";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {useLocation, useParams, useHistory} from "react-router-dom"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiFillPicture } from "react-icons/ai";
import { getCategories, updateRecipe } from "../../WebApi";

const EditRecipe = () => {
  const location = useLocation();
  const {recipe} = location.state;
  // console.log("recipe from edit", recipe);
  // console.log("recipe from edit title", recipe.recipe.recipe_title);
  const [value, setValue] = useState({
    title: recipe.recipe.recipe_title,
    ingredient: recipe.recipe.recipe_ingredient,
    content: recipe.recipe.recipe_content,
    category_id: recipe.recipe.category_id,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [img, setImg] = useState({
    preview: recipe.recipe.recipe_image_url,
    file: "",
  });
  const { id } = useParams()
  let history = useHistory()
  const { title, ingredient, content, category_id } = value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setValue({ ...value, content: data });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const image = img.file;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredient", ingredient);
      formData.append("content", content);
      formData.append("category_id", category_id);
      formData.append("image", image);
      if (!title || !ingredient || !content) return setErrorMessage("有欄位忘記填囉");
      await updateRecipe(id, formData);
      setValue({
        ...value,
        title: "",
        ingredient: "",
        content: "",
        category_id: 1,
      });
      setImg({
        preview:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        file: "",
      });
      setErrorMessage("")
      history.push(`/recipes/${id}`)
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleuploadPicture = (e) => {
    setImg({
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      // console.log("my res", response.data);
      setCategoryList(response.data);
    };
    fetchData();
  }, []);

  console.log("category_id", category_id);
  return (
    <AddRecipeContainer>
      <AddRecipeSection>
        <AddRecipeTitle>編輯文章</AddRecipeTitle>
        {errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          <ErrorMessage fadeOut={!errorMessage ? true : false}></ErrorMessage>
        )}
        <AddRecipeForm onSubmit={handleSubmit} enctype="multipart/form-data">
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
              name="category_id"
              className="select"
              onChange={handleChange}
              value={category_id}
              required
            >
              {categoryList.map((category, index) => (
                <AddRecipeSelectOption key={index} value={category.category_id}>
                  {category.category}
                </AddRecipeSelectOption>
              ))}
            </AddRecipeSelect>
          </AddRecipeSelectDivider>
          <AddRecipeImgDivider>
            <AddRecipeImgPreview>
              <ImgPreview src={img.preview} />
            </AddRecipeImgPreview>
            <ImgLabelContainer>
              <ImgLabel>
                <AddRecipeimgInput
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleuploadPicture}
                />
                <AiFillPicture />
                成品圖
              </ImgLabel>
            </ImgLabelContainer>
          </AddRecipeImgDivider>
          <AddRecipeDivider></AddRecipeDivider>
          <AddRecipeDivider>
            <AddRecipeLabel>文章內容：</AddRecipeLabel>
            <CKEditor
              editor={ClassicEditor}
              onChange={handleEditorChange}
              data={content}
              required
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "550px",
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    "padding",
                    "10px 25px 10px 25px",
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    "line-height",
                    "1.5rem",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "indent",
                  "outdent",
                  "|",
                  "codeBlock",
                  "blockQuote",
                  "insertTable",
                  "mediaEmbed",
                  "undo",
                  "redo",
                ],
              }}
            />
          </AddRecipeDivider>
          <AddRecipeButton>送出</AddRecipeButton>
        </AddRecipeForm>
      </AddRecipeSection>
    </AddRecipeContainer>
  );
};

export default EditRecipe;
