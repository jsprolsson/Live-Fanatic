import { Link } from 'react-router-dom'
 
const FooterComponent = () => {
    return(
        <nav>
            <Link to="/">HomeIcon</Link>
            <Link to="/events">CalenderIcon</Link>
            <img src='' alt='img of lookingglass' />
            <Link to="/profile">ProfileIcon</Link>
            
          </nav>
    )
}

export default FooterComponent