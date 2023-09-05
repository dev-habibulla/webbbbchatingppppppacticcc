import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  let navigate=useNavigate("")

  let [email, setEmail] = useState("");

  let handleChange = (e) => {
    setEmail(e.target.value);
  };
  let handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password Reset Email Sent", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode.includes("user-not-found")) {
          toast.error("Email not found", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        // ..
      });
  };

  return (
    <div className="forgotpage">
      <div className="forgotbox">
        <h3>Forgot Password</h3>
        <TextField
          onChange={handleChange}
          className="forgot-inputbox"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <br />
        <Button onClick={handleForgotPassword} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
