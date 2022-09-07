import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import AboutUsComponent from './components/AboutUsComponent'
import HeaderComponent from './components/HeaderComponent'
// import './App.css'
import HomeComponent from './components/HomeComponent'
import EventComponent from './components/EventComponent'




function App() {

  return (
    <div>
      <Router>
        <HeaderComponent />
        <main>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/aboutus' element={<AboutUsComponent />} />
            <Route path='/event/:id' element={<EventComponent/>}/>
          </Routes>
        </main>
        <footer>
          <nav>
            <Link to="/">HomeIcon</Link>
            <Link to="/events">CalenderIcon</Link>
            <img src='' alt='img of lookingglass' />
            <Link to="/profile">ProfileIcon</Link>
            <Link to="/event/:id">Kendrick event</Link>
          </nav>
        </footer>
      </Router>
    </div>
  )
}

export default App
