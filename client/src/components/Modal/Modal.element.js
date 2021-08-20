import styled from "styled-components"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  position: fixed;
  background-color: white;
  width: 30%;
  height: 20%;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #efefef;
  padding: 16px;
  top: 35%;
  left: 35%;
  transform: translate(-50%, -50%);

  /* transition: all 0.3s ease-out; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    width: 50%;
  }
`;