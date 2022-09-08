import { useContext } from "react"
import { GlobalContext } from "./store"

export const useStore = (name = 'global') => {
  if (name === 'global') {
    return useContext(GlobalContext)
  }
}