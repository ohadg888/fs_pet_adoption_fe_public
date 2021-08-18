import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import MyPets from "./Pages/MyPets/MyPets";
import PetPage from "./Pages/PetPage/PetPage";
import AddPet from "./Pages/AddPet";
import SearchPage from "./Pages/SearchPage";
import Navbar from "./Components/TopNavbar/TopNavbar";
import AppContext from "./Context/AppContext";

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    userToken
      ? localStorage.setItem("userToken", userToken)
      : localStorage.removeItem("userToken");
  }, [userToken]);

  useEffect(() => {
    userID
      ? localStorage.setItem("userID", userID)
      : localStorage.removeItem("userID");
  }, [userID]);

  return (
    <>
      <AppContext.Provider
        value={{
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          setUserToken: setUserToken,
          userToken: userToken,
          userID: userID,
          setUserID: setUserID,
        }}
      >
        <Router>
          <Navbar />
          {!userToken && <Redirect to="/Home" />}
          <Switch>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/MyPets">
              <MyPets />
            </Route>
            <Route exact path="/PetPage">
              <PetPage />
            </Route>
            <Route exact path="/SearchPage">
              <SearchPage />
            </Route>
            <Route exact path="/AddPet">
              <AddPet />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
