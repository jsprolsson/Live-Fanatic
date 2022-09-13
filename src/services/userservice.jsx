import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";


const logout = () => {
  const { setUser } = useStore()
  const navigate = useNavigate()

  setUser(null)
  return navigate
}


export default {
  logout,
}