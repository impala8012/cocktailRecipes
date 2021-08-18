import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../WebApi";
import { FormInput } from "../index";
import {
  SignInContianer,
  SignInForm,
  SignInTitle,
  SignInButton,
  SignUpMessage,
  SignUpInfo,
  ErrorMessage,
} from "./SignIn.element";
import { LoadingContext, AuthContext } from "../../contexts";
import { Loading } from "../index";

const SignIn = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const { email, password } = value;
  let history = useHistory();

  const handleChange = (e) => {
    setErrorMessage(null);
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email || !password) return setErrorMessage("有欄位忘記填了");
      const body = { email, password };
      const response = await login(body);
      const parseResponse = await response.json();
      setIsLoading(false);
      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        setIsAuth(true);
        setValue("");
        history.push("/");
      } else {
        setIsAuth(false);
        history.push("/login");
        setErrorMessage("帳號密碼輸入錯誤");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      history.push("/login");
      setErrorMessage("帳號密碼輸入錯誤");
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SignInContianer>
          <SignInForm onSubmit={handleSubmit}>
            <SignInTitle>帳號登入</SignInTitle>
            {errorMessage ? (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            ) : (
              <ErrorMessage
                fadeOut={!errorMessage ? true : false}
              ></ErrorMessage>
            )}
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
            <SignInButton>登入</SignInButton>
          </SignInForm>
          <SignUpMessage>
            還未註冊嗎?
            <SignUpInfo to="register">註冊去</SignUpInfo>
          </SignUpMessage>
        </SignInContianer>
      )}
    </>
  );
};

export default SignIn;
