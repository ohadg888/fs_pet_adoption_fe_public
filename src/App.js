import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import AppContext from "./Context/AppContext";

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [userID, setUserID] = useState(null);

  return (
    <>
      <AppContext.Provider
        value={{
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          userID: userID,
        }}
      >
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
