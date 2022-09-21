import { useState, useEffect, createContext } from 'react'

const exampleUser = {
  email: 'example@exam.com',
  password: '432i4h32j32423',
}

const getState = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInStorage = JSON.parse(sessionStorage.getItem('user'))

    if (userInStorage) {
      setUser(userInStorage)
    }
  }, [])


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