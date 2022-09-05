import { Link } from 'react-router-dom'

const HomeComponent = () => {
  return (
    <div>
      <h2>Welcome to Home</h2>
      <Link to="/aboutus">About</Link>
    </div>
  )
}

export default HomeComponent