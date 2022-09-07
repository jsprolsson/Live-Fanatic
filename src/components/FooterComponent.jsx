import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/FooterComponent.css'

function FooterComponent() {
    return(
        <footer>
            <button className='FooterButtonHome'>
                <span class="material-symbols-outlined">
                    home
                </span>
            </button>
            <button className='FooterButtonCalendar'>
                <span class="material-symbols-outlined">
                    calendar_month
                </span>
            </button>
            <button className='FooterButtonSearch'>
                <span class="material-symbols-outlined">
                    search
                </span>
            </button>
            <button className='FooterButtonProfile'>
                <span class="material-symbols-outlined">
                    person
                </span>
            </button>
        </footer>
    )
}

/// Döp alla knappar till FooterButtonHome t.ex.

export default FooterComponent