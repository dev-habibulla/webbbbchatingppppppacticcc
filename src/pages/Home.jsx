import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logedUser } from "../slices/userSlice";
import { useDispatch,useSelector } from "react-redux";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate("");
  let dispatch = useDispatch();
  
  let data = useSelector((stade) => stade.logedUser.value);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  let handleLogout = () => {
    signOut(auth).then(() => {

      toast.success("Log Out Successful", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        dispatch(logedUser(null));
        localStorage.removeItem("user");
        navigate("/login");
      }, 2000);
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleLogout} variant="outlined">
        Log Out
      </Button>
    </div>
  );
};

export default Home;
