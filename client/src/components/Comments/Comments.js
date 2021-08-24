import React from "react";
import {
  CommentsContainer,
  CommentsHeader,
  CommentBoard,
  CommentUser,
  CommentContent,
  CommentDesc,
  CommentRating,
} from "./Comments.element";
import { Loading, Star } from "../index";

const Comments = ({ comments,isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CommentsContainer>
          <CommentsHeader>最新留言</CommentsHeader>
          {comments.length === 0 &&  (
            <CommentBoard>
              <CommentDesc>目前沒有留言...</CommentDesc>
            </CommentBoard>
          )}
          {comments.map((comment, index) => {
              return (
                <CommentBoard key={index}>
                  <CommentUser>{comment.user_name}</CommentUser>
                  <CommentContent>
                    <CommentRating>
                      <Star rating={comment.comment_rating} />
                    </CommentRating>
                    <CommentDesc>{comment.comment_description}</CommentDesc>
                  </CommentContent>
                </CommentBoard>
              );
          })}
        </CommentsContainer>
      )}
    </>
  );
};

export default Comments;
