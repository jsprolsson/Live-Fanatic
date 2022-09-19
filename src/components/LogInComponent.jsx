import { useState } from "react";
import LoginFormComponent from "./LoginFormComponent";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import userService from "../services/userservice";

const LoginComponent = ({ closeModal }) => {
  const { user, setUser } = useStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Login = async (details) => {
  const data = await userService.login(details, setUser);

    if (data.loggedIn) {
      closeModal();
    } else {
      if (!details.password && !details.email) {
        setError("Please enter email and password");
      } else if (!details.email) {
        setError("Please enter email");
      } else if (!details.password) {
        setError("Please enter password");
      } else {
        setError(data);
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
