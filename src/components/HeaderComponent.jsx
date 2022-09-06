import { useState } from 'react'
import { Link } from 'react-router-dom'

function Hamburger() {
  return (
    <>
      <div className="hamburger">
        <div className="burger burger1"></div>
        <div className="burger burger2"></div>
        <div className="burger burger3"></div>
      </div>
    </>
  )
}

function HeaderComponent() {
  const [hamburgerOpen, setHamburgerOpen] = useState(true)

  const handleHamburger = () => setHamburgerOpen(!hamburgerOpen)
  return (
    <header>
      <img id='header-logo' src='' alt='logo of Live Fanatic' />
      <div id='header-searchbar'>
        <input />
      </div>
      <nav className='navigation'>
        <Link to={"/events"}>Calender</Link>
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/about-us"}>About us</Link>
        <div className='hamburger' onClick={handleHamburger}>
          <Hamburger />
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent