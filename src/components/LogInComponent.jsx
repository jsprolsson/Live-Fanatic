import { useState } from "react";
import LoginFormComponent from "./LoginFormComponent";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ closeModal }) => {
  const { user, setUser } = useStore();
  const [error, setError] = useState("");
  let dbUser = { email: "test@test.com", password: "test" };
  const navigate = useNavigate();

  const Login = (details) => {
    if (details.email == dbUser.email && details.password == dbUser.password) {
      const newUser = { email: details.email, password: details.password };
      setUser(newUser);
      closeModal();
    } else {
      if (!details.password && !details.email) {
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
