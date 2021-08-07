import styled from 'styled-components'

export const DotsContainer = styled.div`
  width: 10%;
  height: 10%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 75%;
  z-index: 200;
  background-color: red;
`;

export const Dot = styled.span`
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  margin: 0 3px;
  /* background-color: rgba(0, 0, 0, 0.3); */
  background-color: blue;
  border-radius: 50%;
  display: inline-block;

  /* &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  ${({ active }) =>
    active === true &&
    `
  background-color: rgba(255,255,255,0.5);
 `} */

`;