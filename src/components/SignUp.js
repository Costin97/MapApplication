import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorText, SetErrorText] = useState("");

  let disabled = false;
  let data;
  const history = useNavigate();
  if (email !== "" && password !== "") {
    data = {
      email: email,
      password: password,
    };
  }
  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const surnameHandler = (event) => {
    setSurname(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  if (firstName !== "" && surname !== "" && password !== "" && email !== "") {
    disabled = true;
  }

  const signUpHandler = (event, path) => {
    event.preventDefault();
    const submitDataHandler = async (data) => {
      await fetch("https://625c5621c9e78a8cb9b6d7a9.mockapi.io/user", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      setTimeout(() => history(path), 500);
    };
    submitDataHandler(data).catch((e) => {
      setIsError(true);
      SetErrorText("Something went wrong!");
    });
  };

  return (
    <Fragment>
      {isError !== true ? (
        <div className={classes.container}>
          <div className={classes.box}>
            <h1 className={classes.title}>Kite</h1>
            <div className={classes.nameInputBox}>
              <input
                type="text"
                placeholder="First Name"
                className={classes.firstName}
                onChange={firstNameHandler}
              ></input>
              <input
                type="text"
                placeholder="Surname"
                className={classes.surname}
                onChange={surnameHandler}
              ></input>
            </div>
            <input
              type="email"
              placeholder="Email"
              className={classes.email}
              size="49"
              onChange={emailHandler}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className={classes.password}
              size="49"
              onChange={passwordHandler}
            ></input>
            <div>
              <p className={classes.dateOfBirthPara}>Date of birth</p>
            </div>
            <div className={classes.dateOfBirthBox}>
              <select className={classes.dayList}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select className={classes.monthList}>
                <option value="jan.">jan.</option>
                <option value="feb.">feb.</option>
                <option value="mar.">mar.</option>
                <option value="apr.">apr.</option>
                <option value="may.">may.</option>
                <option value="jun.">jun.</option>
                <option value="jul.">jul.</option>
                <option value="aug.">aug.</option>
                <option value="sept.">sept.</option>
                <option value="oct.">oct.</option>
                <option value="nov.">nov.</option>
                <option value="dec.">dec.</option>
              </select>
              <select className={classes.yearList}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2019">2022</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
              </select>
            </div>
            <div className={classes.gendreBox}>
              <p className={classes.gendrePara}>Gendre</p>
              <select className={classes.gendreList}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {disabled === false ? (
            <NavLink to="/loginpage" className={classes.signUpButtonDisabled}>
              Sign Up
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className={classes.signUpButton}
              onClick={(event) => {
                signUpHandler(event, "/loginpage");
              }}
            >
              Sign Up
            </NavLink>
          )}
        </div>
      ) : (
        <p className={classes.errorText}>{errorText}</p>
      )}
    </Fragment>
  );
};

export default SignUp;
