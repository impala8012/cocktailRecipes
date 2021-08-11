import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GlobalStyle from "./globalStyle"
import {
  Navbar,
  Slider,
  Footer,
  HomeRecipeList,
  RecipeList,
  Recipe,
  CategoryList,
  SignUp,
  AddRecipe,
} from "./components";
import { sliderData } from "./components/Slider/Data";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      {/* <Slider />
      <HomeRecipeList /> */}
      {/* <RecipeList /> */}
      {/* <Recipe /> */}
      {/* <CategoryList /> */}
      {/* <SignUp /> */}
      <AddRecipe />
      <Switch>
        <Route />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
