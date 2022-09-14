import { useState } from "react";
import LoginFormComponent from "./LoginFormComponent";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ closeModal }) => {
  const { user, setUser } = useStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Login = async (details) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    };

    const response = await fetch("/data/login", requestOptions);
    const data = await response.json();

    if (data.loggedIn) {
      //fetch userid
      const userResponse = await fetch("/data/login");
      const userFromDb = await userResponse.json();
      //set user in context
      const newUser = {
        email: details.email,
        password: details.password,
        id: userFromDb.id,
      };
      setUser(newUser);
      closeModal();
      navigate("/");
    } else {
      if (!data.loggedIn) {
        setError(data.message);
      } else if (!details.password && !details.email) {
        setError("Please enter email and password");
      } else if (!details.email) {
        setError("Please enter email");
      } else if (!details.password) {
        setError("Please enter password");
      } else if (details.email !== user.email) {
        setError("Invalid email");
      } else if (details.password !== user.password) {
        setError("Invalid password");
      }
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  return (
    <div>
      <LoginFormComponent Login={Login} error={error} />
    </div>
  );
};

export default LoginComponent;
