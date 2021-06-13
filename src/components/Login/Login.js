import React from "react";
import { accessUrl } from "../../spotify";

import "./style.css";

const Login = () => {
  return (
    <div className="loginScreen">
      <img
        src={
          "https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg"
        }
        alt={"Spotify Logo"}
      />
      <a href={accessUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
