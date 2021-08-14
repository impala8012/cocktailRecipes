import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GlobalStyle from "./globalStyle"
import {
  Navbar,
  Footer,
} from "./components";
import { HomePage, CategoryListPage, AddRecipePage, RecipeListPage, LoginPage, RegisterPage } from "./page";
import {LoadingContext} from "./contexts"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
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
          <Route path="/add-Recipe">
            <AddRecipePage />
          </Route>
          <Route exact path="/recipes">
            <RecipeListPage />
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
  );
}

export default App;
