import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  AddCommentContainer,
  AddCommentTitle,
  AddCommentForm,
  CommentContent,
  AddCommentButton,
} from "./AddComment.element";
import StarRating from "../StarRating/StarRating";
import { LoadingContext } from "../../contexts";
import { Loading } from "../index";
import { createComment } from "../../WebApi";

const AddComment = ({ setRecipeChange }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const { id } = useParams();
  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      if (!rating || !comment) return;
      await createComment(id, comment, rating, signal);
      setComment("");
      setRating(0);
      setIsLoading(false);
      setRecipeChange(true);
    } catch (err) {
      console.log(err.message);
    }
    return function cleanup() {
      abortController.abort();
    };
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AddCommentContainer>
          <AddCommentForm
            action="/recipes/:id/comments"
            method="POST"
            onSubmit={handleSubmit}
          >
            <AddCommentTitle>來留點評論吧</AddCommentTitle>
            <StarRating rating={rating} setRating={setRating} />
            <CommentContent
              name="description"
              type="text"
              placeholder="留下你的評論吧"
              onChange={handleChange}
            ></CommentContent>
            <AddCommentButton>送出</AddCommentButton>
          </AddCommentForm>
        </AddCommentContainer>
      )}
    </>
  );
};

export default AddComment;
