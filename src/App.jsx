import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUsComponent from "./components/AboutUsComponent";
import CalendarComponent from "./components/CalendarComponent";
// import './App.css'
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div>
      <Router>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/aboutus">About</Link>
            <Link to="/events">Calender</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/aboutus" element={<AboutUsComponent />} />
            <Route path="/events" element={<CalendarComponent />} />
          </Routes>
        </main>
        <footer>
          <nav>
            <Link to="/">HomeIcon</Link>
            <Link to="/events">CalenderIcon</Link>
            <img src="" alt="img of lookingglass" />
            <Link to="/profile">ProfileIcon</Link>
          </nav>
        </footer>
      </Router>
    </div>
  );
}

export default App;
