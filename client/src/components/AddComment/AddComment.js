import React, {useState} from 'react'
import {
  AddCommentContainer,
  AddCommentTitle,
  AddCommentForm,CommentRating,
  CommentContent,
  AddCommentButton,
} from "./AddComment.element";
import StarRating from "../StarRating/StarRating";

const AddComment = () => {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)

  const handleChange = e => setComment(e.target.value)
  const handleClick = (e) => setRating(e.target.value);
  const handleSubmit = e => {
    e.preventDefault()
    if (!rating || !comment) return; 
    setComment("")
    setRating(0);
  }
  return (
    <AddCommentContainer>
      <AddCommentForm
        action="/recipes/:id/comments"
        method="POST"
        onSubmit={handleSubmit}
      >
        <AddCommentTitle>來留點評論吧</AddCommentTitle>
        <StarRating rating={rating} setRating={setRating} onClick={handleClick}/>
        <CommentContent
          name="description"
          type="text"
          placeholder="留下你的評論吧"
          onChange={handleChange}
        ></CommentContent>
        <AddCommentButton>送出</AddCommentButton>
      </AddCommentForm>
    </AddCommentContainer>
  );
}

export default AddComment
