import { useState, createContext } from 'react'


const getState = () => {
  const [user, setUser] = useState(null)

  return {
    user,
    setUser
  }
}

export const GlobalContext = createContext()

export function GlobalContextProvider(props) {
  return (
    <GlobalContext.Provider value={getState()}>
      {props.children}
    </GlobalContext.Provider>
  )
}