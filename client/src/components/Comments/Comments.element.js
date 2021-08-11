import styled from "styled-components";
import { Container } from "../../globalStyle";

export const CommentsContainer = styled(Container)`
  width: 70%;
  margin: 30px auto;
  background: light-blue;
  padding: 30px; ;
`;

export const CommentsHeader = styled.div`
  width: 100%;
  background: red;
  display: inline-flex;
`;
export const CommentBoard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
`;
export const CommentUser = styled.div`
  display: inline-block;
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #0078c5;
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentDesc = styled.div`
  align-self: flex-start;
  word-break: break-word;
  color: #666;
  line-height: 2em;
  letter-spacing: 0.05em;
`;
export const CommentRating = styled.div`
  width: 150px;
  top: -10px;
  /* display: block;
  text-align: center; */
  /* margin-right: 10px;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 5px;
  background: #ccc;
  color: #fff;
  transition: all 0.3s;
  border: 1px solid #ccc; */
`;
