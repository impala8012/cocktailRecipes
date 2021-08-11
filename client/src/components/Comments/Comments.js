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
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Comments = () => {
  let floorRating = 1.5;
  let avgRating = 1.5;
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < floorRating) {
      stars.push(<BsStarFill key={i}/>);
    } else if (avgRating - i > 0 && avgRating - i < 1) {
      stars.push(<BsStarHalf key={i} />);
    } else {
      stars.push(<BsStar key={i} />);
    }
  }

  return (
    <CommentsContainer>
      <CommentsHeader>最新留言</CommentsHeader>
      <CommentBoard>
        <CommentUser>Dylan</CommentUser>
        <CommentContent>
          <CommentRating>5</CommentRating>
          <CommentDesc>
            這個看起來很讚欸這個看起來很讚欸這個看起來很讚欸 這個看起來很讚欸
            這個看起來很讚欸 這個看起來很讚欸 這個看起來很讚欸 這個看起來很讚欸
          </CommentDesc>
        </CommentContent>
      </CommentBoard>

      <CommentBoard>
        <CommentUser>Dylan</CommentUser>
        <CommentContent>
          <CommentRating>{stars}</CommentRating>
          <CommentDesc>
            這個看起來很讚欸這個看起來很讚欸這個看起來很讚欸 這個看起來很讚欸
            這個看起來很讚欸 這個看起來很讚欸 這個看起來很讚欸 這個看起來很讚欸
          </CommentDesc>
        </CommentContent>
      </CommentBoard>

      <CommentBoard>
        <CommentUser>Dylan</CommentUser>
        <CommentContent>
          <CommentRating>{stars}</CommentRating>
          <CommentDesc>
            這個看起來很讚欸 這個看起來很讚欸 這個看起來很讚欸
          </CommentDesc>
        </CommentContent>
      </CommentBoard>
    </CommentsContainer>
  );
};

export default Comments;
