import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/FooterComponent.css'

function FooterComponent() {
    return(
        <footer className='Navbar-Footer'>
            <button className='FooterButtonHome'>
                <Link to="/">
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </Link>
            </button>
            <button className='FooterButtonCalendar'>
                <Link to="/events">
                    <span className="material-symbols-outlined">
                        calendar_month
                    </span>
                </Link>
            </button>
            <button className='FooterButtonSearch'>
                <Link to="/search">
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </Link>
            </button>
            <button className='FooterButtonProfile'>
                <Link to="/profile">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </Link>
            </button>
        </footer>
    )
}
/// Profile not linked 08/09

/// Döp alla knappar till FooterButtonHome t.ex.

export default FooterComponent