import React from "react";
import "./App.css";
import TickersList from "./TickersList";
import Ticker from "./Ticker";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={TickersList} />
        <Route path="/ticker:id" exact component={Ticker} />
      </Router>
    </div>
  );
}

export default App;
