import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/HeaderComponent.css'

import logo from '../assets/Livefanatic.png'

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
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const handleHamburger = () => setHamburgerOpen(!hamburgerOpen)
  return (
    <header>
      <div className='header-top'>
        <Link to={'/'}>
          <img id='header-logo' src={logo} alt='logo of Live Fanatic' />
        </Link>
        <nav className='header-nav-top'>
          <Link className='header-nav-link' to={"/events"}>Calender</Link>
          <Link className='header-nav-link' to={"/profile"}>Profile</Link>
          <Link className='header-nav-link' to={"/about-us"}>About us</Link>
        </nav>
        <div id='header-searchbar'>
          <input placeholder='search' />
          <button id='header-search-btn'>search</button>
        </div>
        <div className='hamburger' onClick={handleHamburger}>
          <Hamburger />
        </div>
      </div>
      {hamburgerOpen ? <div className='header-bot'>
        <nav className='header-nav-bot'>
          <Link className='header-nav-link' to={"/events"}>Calender</Link>
          <Link className='header-nav-link' to={"/profile"}>Profile</Link>
          <Link className='header-nav-link' to={"/about-us"}>About us</Link>
        </nav>
      </div> : null}
    </header>
  )
}

export default HeaderComponent