import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  AddCommentContainer,
  AddCommentTitle,
  AddCommentForm,
  CommentContent,
  AddCommentButton,
  ErrorMessage,
} from "./AddComment.element";
import StarRating from "../StarRating/StarRating";
import { LoadingContext,AuthContext } from "../../contexts";
import { Loading } from "../index";
import { createComment } from "../../WebApi";

const AddComment = ({ setRecipeChange }) => {
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { isAuth } = useContext(AuthContext);

  const { id } = useParams();
  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token =localStorage.token
    try {
      if (!rating || !comment) return setErrorMessage("有欄位忘記填囉");
      await createComment(id, comment, rating, token);
      setComment("");
      setRating(0);
      setErrorMessage("")
      setIsLoading(false);
      setRecipeChange(true);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AddCommentContainer>
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <ErrorMessage fadeOut={!errorMessage ? true : false}></ErrorMessage>
          )}
          <AddCommentForm
            action="/recipes/:id/comments"
            method="POST"
            onSubmit={handleSubmit}
          >
            {isAuth ? (
              <>
                <AddCommentTitle>來留點評論吧</AddCommentTitle>
                <StarRating rating={rating} setRating={setRating} />
                <CommentContent
                  name="description"
                  type="text"
                  placeholder="留下你的評論吧"
                  onChange={handleChange}
                ></CommentContent>
                <AddCommentButton>送出</AddCommentButton>
              </>
            ) : (
              <>
                <AddCommentTitle>來留點評論吧</AddCommentTitle>
                <StarRating rating={rating} setRating={setRating} />
                <CommentContent
                  name="description"
                  type="text"
                  placeholder="要先登入才能留言喔"
                  onChange={handleChange}
                ></CommentContent>
              </>
            )}
          </AddCommentForm>
        </AddCommentContainer>
      )}
    </>
  );
};

export default AddComment;
