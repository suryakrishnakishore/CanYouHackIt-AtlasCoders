import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.scss";

function Auth() {
  const [logIn, setLogIn] = useState(null);
  const [errors, setError] = useState(null);
  const [data, setData] = useState({
    user_email: "",
    password: "",
    cnf_password: "",
  });
  let navigate = useNavigate();

  function viewLogIn(status) {
    setLogIn(status);
  }

  function handleChange(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setData((prev) => {
      if (name === "email") {
        return {
          user_email: value,
          password: prev.password,
          cnf_password: prev.cnf_password,
        };
      } else if (name === "password") {
        return {
          user_email: prev.user_email,
          password: value,
          cnf_password: prev.cnf_password,
        };
      } else if (name === "cnf-password") {
        return {
          user_email: prev.user_email,
          password: prev.password,
          cnf_password: value,
        };
      }
    });
  }
  // const [respo, setRespo] = useState(null);
  function handleSubmit(event, endpt) {
    event.preventDefault();
    if (!logIn && data.password !== data.cnf_password) {
      setError("Make sure the password match!");
      return;
    }
    // setError(null);
    async function handleData() {
      try {
        if (endpt === "signup") {
          // setError(null);
          const response = await axios.post(
            `http://localhost:3000/${endpt}`,
            data
          );
          if (response.data.status === false) {
            setError("User ALready Exists");
          }else if (response.data.status === true) {
            navigate(`/todos/${data.user_email}`);
          } 
        } else if (endpt === "login") {
          // setError(null);
          const responce = await axios.post(
            `http://localhost:3000/${endpt}`,
            data
          );
          console.log(responce.data);
          //respo = responce.data.status;
          console.log("Inside: ", responce.data.status);
          // setRespo[responce.data.status];
          if (responce.data.status === true) {
            navigate(`/todos/${data.user_email}`);
          } else if (responce.data.status === false) {
            setError("Incorrect Password");
          }
        }

      } catch (err) {
        console.log(err);
      }
    }
    handleData();
  }

  return (
    <div className="auth-container">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div className="auth-container-box">
        {logIn !== null && (
          <>
            <form action="" method="post">
              <h2>{logIn ? "Please LOG IN" : "Please SIGN IN"}</h2>

              <input
                type="email"
                name="email"
                value={data.user_email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              {!logIn && (
                <input
                  type="password"
                  name="cnf-password"
                  value={data.cnf_password}
                  id=""
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              )}
              {errors && <p>{errors}</p>}
              <div className="form-btns">
                <button className="log" onClick={() => viewLogIn(null)}>
                  Back
                </button>
                <button
                  className="reg"
                  type="submit"
                  onClick={(e) => handleSubmit(e, logIn ? "login" : "signup")}
                >
                  {logIn ? "Log In" : "Sign Up"}
                </button>
              </div>
            </form>
          </>
        )}
        {logIn === null && (
          <>
            <div className="auth-options">
              <h1 style={{marginBottom: "20px"}}>Automated Notes APP</h1>
              <div>
                <button className="reg" onClick={() => viewLogIn(false)}>
                  Sign Up
                </button>
                <button className="log" onClick={() => viewLogIn(true)}>
                  Log In
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
