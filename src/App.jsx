
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import AboutUsComponent from './components/AboutUsComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import CalendarComponent from "./components/CalendarComponent";
import SearchComponent from './components/SearchComponent'
import EventComponent from './components/EventComponent';
import PaymentComponent from './components/PaymentComponent';
import ProfileComponent from './components/ProfileComponent';



import './App.css'

import HomeComponent from "./components/HomeComponent";
import RegisterComponent from './components/RegisterComponent'

import { GlobalContextProvider } from './store/store';
import LiveStreamComponent from './components/LiveStreamComponent';
import EnterCardComponent from './components/EnterCardComponent'
import ConfirmBuyComponent from './components/ConfirmBuyComponent';
import CancelBuyComponent from './components/CancelBuyComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';

function App() {
  return (
    <div className='body'>
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
              <Route path='/payment' element={<PaymentComponent />} />
              <Route path='/enterCard' element={<EnterCardComponent />} />
              <Route path='/confirmbuy' element={<ConfirmBuyComponent />} />
              <Route path='/cancelbuy' element={<CancelBuyComponent />} />
              <Route path='/profile' element={<ProfileComponent />} />
              <Route path='/ticket' element={<TicketComponent />} />
            </Routes>
          </main>
          <FooterComponent />
        </GlobalContextProvider>


      </Router>
    </div>
  );
}

export default App;
