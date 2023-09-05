import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notifications = () => {

  let navigate = useNavigate("");

  let data = useSelector((stade) => stade.logedUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);


  return (
    <div>
      <h3>Notifications</h3>
    </div>
  )
}

export default Notifications
