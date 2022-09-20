import { useState } from "react";
import "../styles/LoginFormComponent.css";
import {useNavigate} from 'react-router-dom'

function LoginFormComponent({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  let navigate=useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="login-form-inner">
        {error != "" ? <div id="login-error">{error}</div> : ""}
        <div className="login-form-group">
          <label className="login-label" htmlFor="email">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
            placeholder="Email"
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
            placeholder="Password"
          />
        </div>
        <input type="submit" value="Login" className="login-button" />
      </div>
       <div className="register-form">
        <p>Do you want to register?</p>
          <button className="button-navigate-to-register"onClick={()=>{
            navigate("/register")
          }}>Register</button>
       </div>
       
    </form>
  );
}

export default LoginFormComponent;
