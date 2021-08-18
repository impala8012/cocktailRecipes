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
} from "./page";
import { LoadingContext, AuthContext, UserContext } from "./contexts";
import {Authentication} from "./WebApi"
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const token = localStorage.token
        const response = await Authentication(token)
        const parseResponse = await response.json()
        // console.log("parseResponse from homw", parseResponse);
        parseResponse === true ? setIsAuth(true) : setIsAuth(false)
        setUser(parseResponse.user_id)
      } catch(err) {
        console.log(err.message)
      }
    }
    fetchData()
  },[])
  console.log("is auth", isAuth)
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
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
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
