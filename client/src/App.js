import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GlobalStyle from "./globalStyle"
import { Navbar, Slider } from "./components";
import { sliderData } from "./components/Slider/Data";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Slider />
      <Switch>
        <Route />
      </Switch>
    </Router>
  );
}

export default App;
