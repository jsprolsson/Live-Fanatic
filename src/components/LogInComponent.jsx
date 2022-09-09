import { useState } from "react";
import LoginFormComponent from "./LoginFormComponent";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const { user, setUser } = useStore();

  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  const Login = (details) => {
    if (details.email == user.email && details.password == user.password) {
      const newUser = { email: details.email, password: details.password };
      setUser(newUser);
      setUserEmail(details.email);
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
      {userEmail != "" ? (
        //här skickas vi till startsidan
        <div>
          <h2>Welcome!</h2>
        </div>
      ) : (
        <LoginFormComponent Login={Login} error={error} />
      )}
    </div>
  );
};

export default LoginComponent;
