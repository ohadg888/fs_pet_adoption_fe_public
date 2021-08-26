import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../Context/AppContext";
import { Prev } from "react-bootstrap/esm/PageItem";

function SaveButton(props) {
  const { petID } = props;
  const { userToken, setUserInfo, userInfo } = useContext(AppContext);
  const [savedPet, setSavedPet] = useState(false);

  useEffect(() => {
    userInfo && setSavedPet(userInfo.savedPets.includes(petID));
  }, [userInfo]);

  const handleSaveToggle = () => {
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:8000/api/pet/${petID}/save`,
        {
          method: savedPet ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const body = await result.json();
      setUserInfo(body.result);
      savedPet ? setSavedPet(false) : setSavedPet(true);
    };
    if (savedPet !== null) {
      fetchData();
    }
  };

  return (
    <div className="save-wrap">
      <FontAwesomeIcon
        icon={faStar}
        className={`save-btn ${savedPet ? "saved" : ""}`}
        onClick={handleSaveToggle}
      />
    </div>
  );
}

export default SaveButton;
