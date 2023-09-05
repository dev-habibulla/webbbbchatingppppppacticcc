import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dna } from "react-loader-spinner";
import { logedUser } from "../slices/userSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [fromData, setFromdata] = useState({
    email: "",
    password: "",
  });

  let data = useSelector((stade) => stade.logedUser.value);

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  }, []);

  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  let handleChange = (e) => {
    setFromdata({
      ...fromData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "email") {
      setEmailError("");
    }
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      toast.success("Login Successful", {
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
        navigate("/home");
      }, 2000);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    });
  };

  let handleLogin = () => {
    signInWithEmailAndPassword(auth, fromData.email, fromData.password)
      .then((user) => {
        // const user = userCredential.user;
        if (user.user.emailVerified) {
          toast.success("Login Successful", {
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
            navigate("/home");
            dispatch(logedUser(user.user));
            localStorage.setItem("user", JSON.stringify(user.user));
          }, 2000);
        } else {
          toast.error("Please Verify Your Email", {
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

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        if (errorCode.includes("wrong-password")) {
          toast.error("Wrong Password", {
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
      });
  };

  return (
    <div className="login">
      <div className="left">
        <div className="text_container">
          <h2>Login to your account!</h2>
          <Button onClick={handleGoogleLogin}>Google Login</Button>

          <TextField
            onChange={handleChange}
            name="email"
            className="inputcss"
            type="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />

          <div>
            <TextField
              onChange={handleChange}
              name="password"
              className="inputcss"
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />

            <AiFillEye onClick={() => setOpen(false)} className="eye" />

            <AiFillEyeInvisible className="eye" />
          </div>

          <Button
            onClick={handleLogin}
            className="loginbtn"
            variant="contained"
          >
            Sign in
          </Button>

          <p>
            Don’t have an account ?{" "}
            <Link to="/" className="focus">
              Sign up
            </Link>
          </p>
          <p>
            Forget Password{" "}
            <Link to="/forgotpassword" className="focus">
              Click here
            </Link>
          </p>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
};

export default Login;
