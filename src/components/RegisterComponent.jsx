import React, { useState } from 'react';
import "../styles/RegisterComponent.css"
import {useNavigate}from 'react-router-dom'


function RegisterComponent(){
     
    const adminUser={
        userName:"admin",
        email:"admin@yahoo.com",
        password:"admin123",
        confirmPassword:"admin123"
    }

    
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

   

    const navigate= useNavigate();


    

    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "userName"){
            console.log(value);
            setUserName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

        

    }
    const handleSubmit  = (e) => {
        console.log(userName,email,password,confirmPassword);
        navigate("/");
    }
    


    
    
    return(
    <> <div className="register-home">
            <div className="register-line">
                <h1>Registrera dig till Live-Fanatic</h1>
            </div>
            <div className="register-page">
                <div className="forms-grid">
                    <form handleSubmit={handleSubmit}>
                      
                            
                        <div className="label-cor"> 
                            <label className="label-text" htmlFor="userName">UserName:</label>
                        </div>
                        <div>
                            <input  
                                type="text" 
                                name="userName" 
                                id="userName" 
                                value={userName}  
                                onChange = {handleInputChange} placeholder="userName"
                             />
                                
                        </div>
                        <div className="label-cor">
                                <label className="label-text" htmlFor="email">E-mail:</label>
                        </div>
                        <div>
                            <input 
                                        type="email" 
                                        name="email" 
                                        id="email"
                                        value={email} 
                                        
                                        onChange={handleInputChange} placeholder="email"
                                        />
                        </div>
                        <div className="label-cor">
                                <label className="label-text" htmlFor="password">Password:</label>
                        </div>
                        <div>
                            <input 
                                        type="password" 
                                        name="password" 
                                        value={password} 
                                        id="password"
                                        onChange={handleInputChange} placeholder="password"
                                        />
                                    
                        </div>
                                    
                        
                        <div className="label-cor">
                                <label className=" label-text" htmlFor="confirmPassword">Vertify Password:</label>
                        </div>
                        <div>           
                                   <input 
                                    type="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword}
                                    id="confirmPassword"
                                    onChange={handleInputChange} placeholder="confirmPassword"
                                    />
                                
                        </div>
                        <div className="register-button">
                            <button onClick={()=>handleSubmit()} type="submit">Register</button>
                        </div>
                    
                            
                    </form>
                        
                </div>
                <div className='Image'>

                </div>
                
            </div>

      </div>
        
        
    </>
    )
    


}
export default RegisterComponent