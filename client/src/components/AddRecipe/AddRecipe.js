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
} from "./AddRecipe.element";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiFillPicture } from "react-icons/ai";
import { getCategories, createRecipe } from "../../WebApi";
const AddRecipe = () => {
  const [value, setValue] = useState({
    title: "",
    ingredient: "",
    content: "",
    category_id: "1",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [img, setImg] = useState({
    preview:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    file: "",
  });
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
      if (!title || !ingredient || !content) return;
      await createRecipe(formData);
      setValue({
        title: "",
        ingredient: "",
        content: "",
        category_id: "1",
      });
      setImg({
        preview:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        file: "",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleImageChange = (e) => {
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   console.log("file", file)
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       console.log("reader.result", reader.result);
  //       setImg(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleuploadPicture = (e) => {
    setImg({
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      console.log("my res", response.data);
      setCategoryList(response.data);
    };
    fetchData();
  }, []);
  return (
    <AddRecipeContainer>
      <AddRecipeSection>
        <AddRecipeTitle>新增文章</AddRecipeTitle>

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
                來張成品圖吧
              </ImgLabel>
            </ImgLabelContainer>
          </AddRecipeImgDivider>
          <AddRecipeDivider>
            {/* <AddRecipeLabel>文章內容：</AddRecipeLabel> */}
            {/* <AddRecipeTextarea
              className="input-textarea"
              cols="30"
              rows="5"
              name="content"
              onChange={handleChange}
              value={content}
              required
            ></AddRecipeTextarea> */}
          </AddRecipeDivider>
          <AddRecipeDivider>
            <AddRecipeLabel>文章內容：</AddRecipeLabel>
            <CKEditor
              editor={ClassicEditor}
              onChange={handleEditorChange}
              data={content}
              required
              onReady={(editor) => {
                // console.log("Editor is ready to use!", editor);
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

export default AddRecipe;
