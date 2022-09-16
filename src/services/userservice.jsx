import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const logout = async () => {
  await fetch("/data/login", {
    method: 'delete'
  })
}

const login = async (details, setUser) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify({ email: details.email, password: details.password})
  };

    const res = await fetch("/data/login", requestOptions)
    const data = await res.json();
    
    if(res.ok) {
      const resUser = await fetch('/data/login');
      const loggedInUser = await resUser.json();
      
        setUser({
          id: loggedInUser.id,
          email: loggedInUser.email,
          roles: loggedInUser.roles,
        })
        return data;
    }
    else{
      return "Incorrect information";
    }
  
    
}

export default {
  logout, login
}