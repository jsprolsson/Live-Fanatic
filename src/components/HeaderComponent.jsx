import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import "../styles/HeaderComponent.css";
import { useStore } from "../store/useStore";
import logo from "../assets/Livefanatic.png";
import LoginComponent from "./LogInComponent";

function Hamburger() {
  return (
    <>
      <div className="hamburger">
        <div className="burger burger1"></div>
        <div className="burger burger2"></div>
        <div className="burger burger3"></div>
      </div>
    </>
  );
}

function HeaderComponent() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const { user } = useStore();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleHamburger = () => setHamburgerOpen(!hamburgerOpen);

  const inputOnEnterPress = (event) => {
    if (event.key == "Enter") {
      handleSearchSubmit();
    }
  };
  const handleSearchSubmit = (e) => {
    navigate(`/search?name=${searchString}`);
    setSearchString("");
  };
  return (
    <header id="header">
      <div className="header-top">
        <Link to={"/"}>
          <img id="header-logo" src={logo} alt="logo of Live Fanatic" />
        </Link>
        <nav className="header-nav-top">
          <Link className="header-nav-link" to={"/events"}>
            Calender
          </Link>
          <Link className="header-nav-link" to={"/profile"}>
            Profile
          </Link>
          <Link className="header-nav-link" to={"/about-us"}>
            About us
          </Link>
          <div className="account-dropdown">
            <Link className="header-nav-link" to={"/profile"}>
              Account
            </Link>
            <div className="account-dropdown-menu">
              {user != null ? (
                <div>
                  <p>logout</p>
                  <p>account</p>
                </div>
              ) : (
                <div>
                  <p onClick={() => setShow(true)}>login</p>
                  <p>register</p>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div id="header-searchbar">
          <input
            onKeyDown={inputOnEnterPress}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="search"
          />
          <button onClick={handleSearchSubmit} id="header-search-btn">
            search
          </button>
        </div>
        <div className="hamburger" onClick={handleHamburger}>
          <Hamburger />
        </div>
      </div>
      {hamburgerOpen ? (
        <div className="header-bot">
          <nav className="header-nav-bot">
            <Link className="header-nav-link" to={"/events"}>
              Calender
            </Link>
            <Link className="header-nav-link" to={"/profile"}>
              Profile
            </Link>
            <Link className="header-nav-link" to={"/about-us"}>
              About us
            </Link>
            <Link className="header-nav-link" to={"/profile"}>
              Account
            </Link>
          </nav>
        </div>
      ) : null}
      <ModalComponent title="Login" onClose={() => setShow(!show)} show={show}>
        <LoginComponent closeModal={() => setShow(false)} />
      </ModalComponent>
    </header>
  );
}

export default HeaderComponent;
