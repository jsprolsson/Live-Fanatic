import React, { useState } from "react";
import "../styles/RegisterComponent.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  function ErrorMessage(message) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 10000);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }

    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      ErrorMessage("The password is not there or not correct, try again");
    } else if (!email) {
      ErrorMessage("The email adress is not there or not correct, try again");
    } else if (!confirmPassword) {
      ErrorMessage(
        "The confirmed Password is not there or not correct, try again"
      );
    } else if (password != confirmPassword) {
      ErrorMessage("Password do not match");
    } else {
      const registerRequest = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      const response = await fetch("/data/users", registerRequest);
      console.log(response);

      if (response.ok) {
        const loginRequest = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        const response = await fetch("/data/login", loginRequest);
        const loginData = await response.json();
        if (loginData.loggedIn) {
          const newUser = { email: email, password: password };
          setUser(newUser);
          navigate("/");
        }
      } else {
        ErrorMessage("Something went wrong, try again");
      }
    }
  };

  return (
    <div className="register-page">
      <h1 id="register-header">Register to Live-Fanatic</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        {error != "" ? <div className="register-error">{error}</div> : null}

        <div className="register-field">
          <label className="label-text" htmlFor="email">
            {" "}
            Enter E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className="register-field">
          <label className="label-text" htmlFor="password">
            {" "}
            Enter Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>
        <div className="register-field">
          <label className=" label-text" htmlFor="confirmPassword">
            {" "}
            Enter Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            id="confirmPassword"
            onChange={handleInputChange}
            placeholder="Confirm password"
          />
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
export default RegisterComponent;
