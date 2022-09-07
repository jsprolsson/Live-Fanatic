
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import AboutUsComponent from './components/AboutUsComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'

import CalendarComponent from "./components/CalendarComponent";
import SearchComponent from './components/SearchComponent'


// import './App.css'
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <main>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/aboutus" element={<AboutUsComponent />} />
            <Route path="/events" element={<CalendarComponent />} />
            <Route path='/search' element={<SearchComponent />} />
          </Routes>
        </main>

        <FooterComponent/>

      </Router>
    </div>
  );
}

export default App;
