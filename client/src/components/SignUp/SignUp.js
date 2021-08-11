import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import { useHistory } from "react-router-dom";
import {
  SignUpContainer,
  SignUpTitle,
  SignUpForm,
  SignUpBotton,
} from "./SignUp.element";
const SignUp = () => {
  const history = useHistory();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const { username, email, password, confirmedPassword } = value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    history.push("/login");
  };
  return (
    <SignUpContainer>
      <SignUpTitle>現在加入會員吧</SignUpTitle>
      <SignUpForm>
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          label="username"
          required
        />
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
        <FormInput
          type="password"
          name="confirmedPassword"
          value={confirmedPassword}
          onChange={handleChange}
          label="confirm password"
          required
        />
        <SignUpBotton>送出</SignUpBotton>
        <SignUpBotton onClick={handleClick}>回登入畫面</SignUpBotton>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
