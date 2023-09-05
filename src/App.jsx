import React from "react";
import TextField from "@mui/material/TextField";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Messege from "./pages/Messege";
import Notifications from "./pages/Notifications";
import RootLayout from "./components/RootLayout";
import firebaseConfig from "../firebaseConfig";
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/" element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/messege" element={<Messege />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
