import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dna } from "react-loader-spinner";

import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate("");
  let [rgBtnLoad, setRgBtnLoad] = useState(false);

  let [fromData, setFromdata] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  let [fullNameError, setFullNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(false);

  let handleChange = (e) => {
    setFromdata({
      ...fromData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "fullName") {
      setFullNameError("");
    }
    if (e.target.name == "email") {
      setEmailError("");
    }
    if (e.target.name == "password") {
      setPasswordError("");
    }
  };

  let handleRegistrastion = () => {
    setRgBtnLoad(true)
    if (!fromData.fullName) {
      setFullNameError("Full Name Required");
    }
    if (!fromData.email) {
      setEmailError("Email Required");
    }
    if (!fromData.password) {
      setPasswordError("Password Required");
    }

    if (fromData.fullName && fromData.email && fromData.password) {
      let emailValidation =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (fromData.fullName.length < 3) {
        setFullNameError("Minimum 3 Character Required");
      }
      if (!emailValidation.test(fromData.email)) {
        setEmailError("Invalid Email");
      }

      createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then(() => {
         
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
            toast.success("Registration Successful please verify your email", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
          setRgBtnLoad(false)
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          if (errorCode.includes("email-already-in-use")) {
            toast.error("Email already exists!", {
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
          // setTimeout(() => {
          //   navigate("/login");
          // }, 1000);
setRgBtnLoad(false)
          console.log(errorCode);
        });
    }
  };

  return (
    <div className="registration">
      <div className="left">
        <div className="text_container">
          <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>

          <TextField
            onChange={handleChange}
            name="fullName"
            className="inputcss"
            type="text"
            id="outlined-basic"
            label="Fulname"
            variant="outlined"
            value={fromData.fullName}
          />
          {fullNameError && (
            <Alert variant="outlined" severity="error">
              {fullNameError}
            </Alert>
          )}

          <TextField
            onChange={handleChange}
            name="email"
            className="inputcss"
            type="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={fromData.email}
          />
          {emailError && (
            <Alert variant="outlined" severity="error">
              {emailError}
            </Alert>
          )}

          <div>
            <TextField
              onChange={handleChange}
              name="password"
              className="inputcss"
              type={open ? "text" : "password"}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={fromData.password}
            />
            {passwordError && (
              <Alert variant="outlined" severity="error">
                {passwordError}
              </Alert>
            )}
            {open ? (
              <AiFillEyeInvisible
                onClick={() => setOpen(false)}
                className="eye"
              />
            ) : (
              <AiFillEye onClick={() => setOpen(true)} className="eye" />
            )}
          </div>
          {rgBtnLoad ? (
            <Button className="regbtloader" variant="contained">
              <Dna
                visible={true}
                height="40"
                width="70"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </Button>
          ) : (
            <Button
              onClick={handleRegistrastion}
              className="regbtn"
              variant="contained"
            >
              {" "}
              Sign up{" "}
            </Button>
          )}

          <p>
            {" "}
            Alredy have an account ?{" "}
            <Link to="/login" className="focus">
              {" "}
              Sign in{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};
export default Registration;
