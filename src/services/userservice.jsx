import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";


const logout = async () => {
  await fetch("/data/login", {
    method: 'delete'
  })
}


export default {
  logout,
}