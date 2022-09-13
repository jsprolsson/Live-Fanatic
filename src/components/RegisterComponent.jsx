import React, { useState} from 'react';
import "../styles/RegisterComponent.css"
import { useNavigate } from 'react-router-dom'



function RegisterComponent() {
  
  

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function ErrorMessage(message) {
    setError(message)
    setTimeout(() => {
      setError("")
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



  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!password) {
      ErrorMessage("This password is not there or not correct, try again")

    }
    else if (!email) {
      ErrorMessage("This email is not there or not correct, try again")

    }
    else if (!confirmPassword) {
      ErrorMessage("This confirm Password is not there or not correct, try again")

    }
    else {

      navigate("/");
    }


  }





  return (
    <div className="register-page">
      <h1 id='register-header'>Register to Live-Fanatic</h1>
      <form id='register-form' onSubmit={handleSubmit}>
        {(error != "") ? (<div className="register-error">{error}</div>) : null}

        
        <div className='register-field'>
          <label className="label-text" htmlFor="email"> Enter E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange} placeholder="email"
          />
        </div>
        <div className='register-field'>
          <label className="label-text" htmlFor="password"> Enter Password</label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleInputChange} placeholder="password"
          />
        </div>
        <div className='register-field'>
          <label className=" label-text" htmlFor="confirmPassword"> Enter Confirm Password</label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            id="confirmPassword"
            onChange={handleInputChange} placeholder="confirmPassword"
          />

        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  )



}
export default RegisterComponent