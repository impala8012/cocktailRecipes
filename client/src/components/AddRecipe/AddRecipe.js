import React, { useState, useEffect, useContext } from "react";
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
  ModalContent,
  ModalButton,
  ErrorMessage,
} from "./AddRecipe.element";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiFillPicture } from "react-icons/ai";
import { getCategories, createRecipe } from "../../WebApi";
import { getAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../contexts";
import { Loading, Modal } from "../index";

const AddRecipe = () => {
  const [value, setValue] = useState({
    title: "",
    ingredient: "",
    content: "",
    category_id: "1",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [img, setImg] = useState({
    preview:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    file: "",
  });
  const [toggleModal, setToggleModal] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let history = useHistory();
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
    setIsLoading(true);
    try {
      const image = img.file;
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredient", ingredient);
      formData.append("content", content);
      formData.append("category_id", category_id);
      formData.append("image", image);
      if (!title || !ingredient || !content) return setErrorMessage("有欄位忘記填了喔");
      await createRecipe(formData, token);
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
      setIsLoading(false);
      setToggleModal(true);
      // history.push("/recipes");
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      history.push("/recipes");
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
      // console.log("my res", response.data);
      setCategoryList(response.data);
    };
    fetchData();
  }, []);

  return (
    <AddRecipeContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <AddRecipeSection>
          <AddRecipeTitle>新增文章</AddRecipeTitle>
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <ErrorMessage fadeOut={!errorMessage ? true : false}></ErrorMessage>
          )}
          {toggleModal ? (
            <>
              <Modal toggleModal={toggleModal}>
                <ModalContent>新增成功</ModalContent>
                <ModalButton to="/recipes">回到酒譜頁面</ModalButton>
              </Modal>
            </>
          ) : null}
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
                  <AddRecipeSelectOption
                    key={index}
                    value={category.category_id}
                  >
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
                onError={(err) => {
                  console.log(err);
                }}
                onDestroy={(editor) => {
                  console.log("ondestroy editror", editor);
                }}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      {
                        height: "500px",
                        padding: "10px 25px 10px 25px",
                        lineHeight: "1.5rem",
                      },
                      editor.editing.view.document.getRoot()
                    );
                  });
                }}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "Bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "indent",
                    "outdent",
                    "|",
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
      )}
    </AddRecipeContainer>
  );
};

export default AddRecipe;
