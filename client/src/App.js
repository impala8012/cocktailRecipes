import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GlobalStyle from "./globalStyle"
import {
  Navbar,
  Footer,
} from "./components";
import {
  HomePage,
  CategoryListPage,
  AddRecipePage,
  RecipeListPage,
  LoginPage,
  RegisterPage,
  RecipePage,
  RecipeListByCategoryPage,
  EditRecipePage,
  UserRecipesPage,
} from "./page";
import { LoadingContext, AuthContext, UserContext } from "./contexts";
import {Authentication} from "./WebApi"
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await Authentication();
        // console.log("response from auth", response)
        const parseResponse = await response.json()
        // console.log("parseResponse from homw", parseResponse);
        setUser(parseResponse.user[0].user_id);
        parseResponse.isVerified === true ? setIsAuth(true) : setIsAuth(false)
      } catch(err) {
        console.log("這裡出錯囉")
        console.log(err.message)
      }
    }
    fetchData()
  },[])
  console.log("is auth", isAuth)
  console.log("user from app", user)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Router>
          <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <GlobalStyle />
            <Navbar />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/categories">
                <CategoryListPage />
              </Route>
              <Route path="/categories/:id">
                <RecipeListByCategoryPage />
              </Route>
              <Route path="/add-Recipe">
                <AddRecipePage />
              </Route>
              <Route exact path="/recipes">
                <RecipeListPage />
              </Route>
              <Route exact path="/recipes/:id/edit">
                <EditRecipePage />
              </Route>
              <Route exact path="/recipes/user-recipes">
                <UserRecipesPage />
              </Route>
              <Route path="/recipes/:id">
                <RecipePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
            </Switch>
            <Footer />
          </LoadingContext.Provider>
        </Router>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
