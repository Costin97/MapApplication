import classes from "./LoginPage.module.css";
import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  let data;
  let disabled = false;
  const navigate = useNavigate();
  if (username !== "" && password !== "") {
    data = {
      username: username,
      passwork: password,
    };
  }
  if (username === "" || password === "") {
    disabled = true;
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginHandler = (event, path) => {
    event.preventDefault();
    const submitDataHandler = async (data) => {
      await fetch("https://625c5621c9e78a8cb9b6d7a9.mockapi.io/login", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      setTimeout(() => navigate(path), 500);
    };

    submitDataHandler(data).catch((e) => {
      setIsError(true);
      setErrorText("Something went wrong!");
    });
  };

  return (
    <Fragment>
      {isError === false ? (
        <div className={classes.box}>
          <div className={classes.loginContainer}>
            <h1 className={classes.loginTitle}>Kite</h1>
            <div className={classes.usernameBox}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                size="30"
                onChange={usernameHandler}
                value={username}
              ></input>
            </div>
            <div className={classes.passBox}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                size="30"
                onChange={passwordHandler}
                value={password}
              ></input>
            </div>
            {disabled === false ? (
              <div
                className={classes.linkButtonBox}
                onClick={(event) => {
                  loginHandler(event, "/mappage");
                }}
              >
                <NavLink className={classes.linkButton} to="/">
                  Login
                </NavLink>
                <NavLink className={classes.signUpButton} to="/signuppage">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className={classes.linkButtonBox}>
                <button className={classes.linkButtonDisabled}>Login</button>
                <NavLink className={classes.signUpButton} to="/signuppage">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className={classes.errorText}>{errorText}</p>
      )}
    </Fragment>
  );
};

export default MainPage;
