import React from 'react'
import { SpinnerWrapper, Spinner, SpinnerText } from "./Loading.element";
const Loading = () => {
  return (
    <SpinnerWrapper>
      <Spinner>
        <SpinnerText>Loading...</SpinnerText>
      </Spinner>
    </SpinnerWrapper>
  );
}

export default Loading
