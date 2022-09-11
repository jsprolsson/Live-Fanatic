
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import AboutUsComponent from './components/AboutUsComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import CalendarComponent from "./components/CalendarComponent";
import SearchComponent from './components/SearchComponent'
import EventComponent from './components/EventComponent';
import PaymentComponent from './components/PaymentComponent';
import ProfileComponent from './components/ProfileComponent';



// import './App.css'

import HomeComponent from "./components/HomeComponent";
import RegisterComponent from './components/RegisterComponent'

import { GlobalContextProvider } from './store/store';
import LiveStreamComponent from './components/LiveStreamComponent';
import EnterCardComponent from './components/EnterCardComponent'
import ConfirmBuyComponent from './components/ConfirmBuyComponent';

const PageNotFoundComponent = () => {
  return (
    <div><h1>Page not found</h1></div>
  )
}

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
              <Route path='/livestream/:id' element={<LiveStreamComponent />} />
              <Route path='*' element={<PageNotFoundComponent />} />
              <Route path='/payment'element={<PaymentComponent/>}/>
              <Route path='/enterCard'element={<EnterCardComponent/>}/>
              <Route path='/events/:id/confirmbuy'element={<ConfirmBuyComponent/>}/>
              <Route path='/profile' element={<ProfileComponent/>}/>
            </Routes>
          </main>
          <FooterComponent />
        </GlobalContextProvider>


      </Router>
    </div>
  );
}

export default App;
