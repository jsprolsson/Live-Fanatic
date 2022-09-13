import { useStore } from "../store/useStore";


const logout = () => {
  const { setUser } = useStore();

  if (window.confirm("Are you sure you want to logout?")) {
    setUser(null)

  }
}


export default {
  logout,
}