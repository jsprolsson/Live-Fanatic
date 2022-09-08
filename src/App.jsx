
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
import EventComponent from './components/EventComponent';


// import './App.css'

import HomeComponent from "./components/HomeComponent";
import RegisterComponent from './components/RegisterComponent'

import { GlobalContextProvider } from './store/store';

function App() {
  return (
    <div>
      <Router>
        <GlobalContextProvider>
          <HeaderComponent />
          <main>
            <Routes>

              <Route path="/" element={<HomeComponent />} />
              <Route path="/about-us" element={<AboutUsComponent />} />
              <Route path="/events" element={<CalendarComponent />} />
              <Route path='/search' element={<SearchComponent />} />
              <Route path='events/:id' element={<EventComponent />} />
              <Route path='/register' element={<RegisterComponent />} />

            </Routes>
          </main>
          <FooterComponent />
        </GlobalContextProvider>
      </Router>
    </div>
  );
}

export default App;
