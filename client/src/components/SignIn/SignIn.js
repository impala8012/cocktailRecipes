import React,{useState} from 'react'
import {FormInput} from "../index"
import {
  SignInContianer,
  SignInForm,
  SignInTitle,
  SignInButton,
  SignUpMessage,
  SignUpInfo,
} from "./SignIn.element";

const SignIn = () => {
  const [value, setValue] = useState({
    email:"",password:""
  })
  const {email, password} = value
  const handleChange = e => setValue({...value,[e.target.name]: e.target.value})
  const handleSubmit = e => {
    e.preventDefault()
    setValue("")
  }
  return (
    <SignInContianer>
      <SignInForm onSubmit={handleSubmit}>
        <SignInTitle>帳號登入</SignInTitle>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
      </SignInForm>
      <SignInButton>登入</SignInButton>
      <SignUpMessage>
        還未註冊嗎?
        <SignUpInfo to="register">註冊去</SignUpInfo>
      </SignUpMessage>
    </SignInContianer>
  );
}

export default SignIn
