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
      let getAllUsersResponse = await fetch("/data/users");
      let allUsers = await getAllUsersResponse.json();
      // kollar duplicate i db
      const foundDuplicate = allUsers.filter((user) => user.email == email);

      if (foundDuplicate.length != 0) {
        ErrorMessage("Pick another username");
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
            //fetch userid
            const userResponse = await fetch("/data/login");
            const userFromDb = await userResponse.json();
            //set user in context
            const newUser = {
              email: email,
              password: password,
              id: userFromDb.id,
            };
            setUser(newUser);
            navigate("/");
          }
        } else {
          ErrorMessage("Something went wrong, try again");
        }
      }
    }
  };

  return (
    <div className="register-page">
      <h1 id="register-header">Register to Live-Fanatic</h1>
      <form id="register-form" onSubmit={handleSubmit}>
        <div className="register-field">
          <div className="register-page-error">{error}</div>
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
            placeholder="Confirm Password"
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
