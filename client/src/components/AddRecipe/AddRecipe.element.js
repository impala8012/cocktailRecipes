import styled, { css } from "styled-components";
import { Container, CustomButton } from "../../globalStyle";

export const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: black;
`;

export const AddRecipeContainer = styled(Container)`
  max-width: 860px;
  padding: 25px;
  margin: 50px auto;
  background: #e8e8e8;
  /* height: 130vh; */
`;

export const AddRecipeSection = styled.section`
  text-align: center;
`;

export const AddRecipeTitle = styled.h2`
  color: #666;
  margin-bottom: 2rem;
`;

export const AddRecipeForm = styled.form``;

export const AddRecipeDivider = styled.div`
  margin-bottom: 1.5rem;
`;
export const AddRecipeLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  color: #909090;
`;
export const AddRecipeInput = styled.input`
  background: none;
  background-color: white;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 10px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles};
  }
`;

export const ImgLabelContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  position: absolute;
  top: 110%;
`;

export const AddRecipeimgInput = styled(AddRecipeInput)`
  display: none;
`;
export const ImgLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 30px;
  padding: 5px 10px 5px 10px;
  background-color: #fff;
  border-radius: 10px;
`;
export const AddRecipeImgPreview = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
`;

export const ImgPreview = styled.img`
  width: 100%;
  height: 100%;
`;
export const AddRecipeTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 20px 15px;
  margin-top: 10px;
  font-size: 1rem;
  color: #666;
  line-height: 1.8rem;
  border: 1px solid #ddd;
  background: #fff;
  border: none;
  border-bottom: 1px solid #6c6c6c38;
  outline: none;
  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.03);
  }
`;
export const AddRecipeSelectDivider = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
export const AddRecipeSelect = styled.select`
  background: #f9f9f9;
  color: #03a9f4;
  padding: 5px 10px;
  /* appearance: button; */
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #03a9f4;
`;
export const AddRecipeSelectOption = styled.option`
  padding: 30px;
`;

export const AddRecipeButton = styled(CustomButton)`
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: #4b3e3e;
  background-color: #8c969c;

  :hover {
    background-color: #9c8c8c;
  }
`;
