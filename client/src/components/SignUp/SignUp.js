import React, { useState, useContext } from "react";
import FormInput from "../FormInput/FormInput";
import { useHistory } from "react-router-dom";
import {
  SignUpContainer,
  SignUpTitle,
  SignUpForm,
  SignUpBotton,
  ErrorMessage,
} from "./SignUp.element";
import { LoadingContext, AuthContext, UserContext } from "../../contexts";
import { Loading } from "../index";
import { register } from "../../WebApi";

const SignUp = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setIsAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);


  const { username, email, password, confirmedPassword } = value;
  let history = useHistory();

  const handleChange = (e) => {
    setErrorMessage(null);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    history.push("/login");
  };
  const handleSubmit = async (e) => {
    try {
      setErrorMessage(null);
      e.preventDefault();
      if (!username || !email || !password || !confirmedPassword) {
        return setErrorMessage("有欄位忘記填囉");
      }
      if (password !== confirmedPassword) {
        return setErrorMessage("密碼似乎有誤喔");
      }
      setIsLoading(true);
      const body = { username, email, password };
      const response = await register(body);
      const parseResponse = await response.json();
      setIsLoading(false);
      if (parseResponse.token) {
        // save to the localStorage
        localStorage.setItem("token", parseResponse.token);
        setIsAuth(true);
        setUser(true)
        history.push("/");
      } else {
        setIsAuth(false);
        setUser(false)
        history.push("/register");
        setErrorMessage("輸入錯誤");
      }
    } catch (err) {
      setIsLoading(false);
      history.push("/register");
      setErrorMessage("輸入欄位錯誤");
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SignUpContainer>
          <SignUpTitle>現在加入會員吧</SignUpTitle>
          <SignUpForm onSubmit={handleSubmit}>
            {errorMessage ? (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            ) : (
              <ErrorMessage
                fadeOut={!errorMessage ? true : false}
              ></ErrorMessage>
            )}
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
              autoComplete="off"
              required
            />
            <FormInput
              type="password"
              name="confirmedPassword"
              value={confirmedPassword}
              onChange={handleChange}
              label="confirm password"
              autoComplete="off"
              required
            />
            <SignUpBotton>送出</SignUpBotton>
            <SignUpBotton onClick={handleClick}>回登入畫面</SignUpBotton>
          </SignUpForm>
        </SignUpContainer>
      )}
    </>
  );
};

export default SignUp;
