import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FooterComponent.css";
import { useStore } from "../store/useStore";
import ModalComponent from "./ModalComponent";
import LoginComponent from "./LogInComponent";

function FooterComponent() {
  const { user } = useStore();
  const [show, setShow] = useState(false);
  return (
    <footer className="Navbar-Footer" id="navbar-footer-desktop">
      <button className="FooterButtonHome">
        <Link to="/">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </button>
      <button className="FooterButtonCalendar">
        <Link to="/events">
          <span className="material-symbols-outlined">calendar_month</span>
        </Link>
      </button>
      <button className="FooterButtonSearch">
        <Link to="/search">
          <span className="material-symbols-outlined">search</span>
        </Link>
      </button>

      {user == null ? (
        <button onClick={() => setShow(true)} className="FooterButtonProfile">
          <span className="material-symbols-outlined">person</span>
        </button>
      ) : (
        <button className="FooterButtonProfile">
          <Link to="/profile">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </button>
      )}

      <p id="footer-text">
        * Biljettpriser och tillgänglighet kan komma att ändras <br /> © 2022
        Live Fanatic Sweden. Live Fanatic är ett registrerat varumärke
        tillhörande Live Farnatic
      </p>
      <ModalComponent title="Login" onClose={() => setShow(!show)} show={show}>
        <LoginComponent closeModal={() => setShow(false)} />
      </ModalComponent>
    </footer>
  );
}
/// Profile not linked 08/09

export default FooterComponent;
