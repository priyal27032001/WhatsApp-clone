import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
  const [{}, dispatch] = useStateValue();
  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        ></img>
        <div className="login_text">
          <h1>Sign in to whatsApp</h1>
        </div>
        <Button onClick={SignIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
