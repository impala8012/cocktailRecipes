import React from 'react'
import { FormContainer, FormInputLabel, FormInputs } from "./FormInput.element";
const FormInput = ({ handleChange, label, ...props }) => {
  return (
    <FormContainer>
      {label ? (
        <FormInputLabel shrink={props.value ? true : false}>
          {label}
        </FormInputLabel>
      ) : null}
      <FormInputs onChange={handleChange} {...props}></FormInputs>
    </FormContainer>
  );
};

export default FormInput
