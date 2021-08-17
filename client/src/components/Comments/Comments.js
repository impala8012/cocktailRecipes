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
import { Loading } from "../index";
import { getComments } from "../../WebApi";


const Comments = ({ setRecipeChange, comments,isLoading }) => {
  // const [comments, setComments] = useState([]);
  let floorRating = 1.5;
  let avgRating = 1.5;
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < floorRating) {
      stars.push(<BsStarFill key={i} />);
    } else if (avgRating - i > 0 && avgRating - i < 1) {
      stars.push(<BsStarHalf key={i} />);
    } else {
      stars.push(<BsStar key={i} />);
    }
  }
  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     const comment = await getComments(id);
  //     console.log("response from comment", comment);
  //     setComments(comment);
  //     setIsLoading(false);
  //     setRecipeChange(false);
  //   };
  //   fetchData();
  // }, [id, setIsLoading, setRecipeChange]);
  console.log("comments comments", comments.length);
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
                  <CommentUser>Dylan</CommentUser>
                  <CommentContent>
                    <CommentRating>{comment.comment_rating}</CommentRating>
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
