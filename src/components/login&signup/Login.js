import { React, useState } from "react";
import Logo from "../../images/logo.png";
import anime from "../../images/about.png";
import "../../css/login-signup.css";
import { Logincard } from "./Logincard";
import { Signup } from "./Signup";
import Typewriter from "typewriter-effect";
const Login = () => {
  const [div, SetDiv] = useState("login");
  const showDiv = () => {
    if (div === "login") {
      SetDiv("signup");
    } else {
      SetDiv("login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="logo" />
        <div className="login-box-main">
          <div className="login-left-box">
            <p className="subhaeding">Communex</p>
            <p className="heading">
              <Typewriter
                options={{
                  strings: [
                    "A Plateform Build For Developers",
                    "Build Community For Better Opportunity",
                    "Share Your Knowlege and ideas on Communex ",
                    "cause sharing is caring ",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />{" "}
            </p>
            <img src={anime} alt="anime" className="anime" />
          </div>
          {/* <Logincard/>*/}

          <div className="login-right-box">
            {div === "login" ? <Logincard /> : <Signup />}
            {div === "login" ? (
              <div className="sign-up-link">
                <span>dont have an account ?</span>{" "}
                <button className="sign-up" onClick={() => showDiv()}>
                  {" "}
                  Sign up
                </button>
              </div>
            ) : (
              <div className="sign-up-link">
                <span>alreday have an account ?</span>{" "}
                <button className="sign-up" onClick={() => showDiv()}>
                  {" "}
                  log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
