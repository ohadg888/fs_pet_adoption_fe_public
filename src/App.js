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
import Dashboard from "./Pages/Dashboard";
import PetPage from "./Pages/PetPage";
import AddPet from "./Pages/AddPet";
import SearchPage from "./Pages/SearchPage";
import Navbar from "./Components/TopNavbar/TopNavbar";
import AppContext from "./Context/AppContext";

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userInfo, setUserInfo] = useState(null);
  const [petsList, setPetsList] = useState([]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
      const fetchData = async () => {
        const result = await fetch(
          `https://pet-project-itc.herokuapp.com/api/user/info`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const body = await result.json();
        setUserInfo(body.result);
      };
      fetchData();
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  return (
    <>
      <AppContext.Provider
        value={{
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          setUserToken: setUserToken,
          userToken: userToken,
          userInfo: userInfo,
          setUserInfo: setUserInfo,
          petsList: petsList,
          setPetsList: setPetsList,
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
            <Route path="/PetPage/:id">
              <PetPage />
            </Route>
            <Route exact path="/Dashboard">
              <Dashboard />
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
