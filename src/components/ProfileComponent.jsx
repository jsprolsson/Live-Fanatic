import "../styles/ProfileComponent.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import paymentService from "../services/paymentService";
import eventService from "../services/eventService";
import { useStore } from "../store/useStore";
import ModalComponent from "./ModalComponent";
import LoginComponent from "./LogInComponent";

function ProfileComponent() {
  const [userFromDb, setUserFromDb] = useState({});
  const [userevents, setUserEvents] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [email, setUpdateEmail] = useState("");
  const [newPassword, setUpdateNewPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useStore();
  const [show, setShow] = useState(false);
  

  //hämta användare
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/data/login");
      let userData = await response.json();

      setUserFromDb(userData);

      //hämta user tickets
      const userTicketData = await paymentService.getTickets(userData.id);
      setUserTickets(userTicketData);

      //filtrera ut bara ticketsid till egen lista
      const ticketsIds = userTicketData.map(({ event_id }) => event_id);

      //fetch alla events
      const allEvents = await eventService.getAll();

      //filtrera ut bara events usern ska på
      let filteredJson = allEvents.filter((event) =>
        ticketsIds.includes(event.id)

      );

      setUserEvents(filteredJson);
    };
    fetchData();
  }, []);

  function Message(message) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 10000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(newPassword);
  };

  const changePassword = async (newPassword) => {
    // //sätter lösenord till null i db
    const requestChangePassword = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    };
    if (email == userFromDb.email) {
      const response = await fetch(
        "/data/users/password",
        requestChangePassword
      );

      if (response.ok) {
        const changePasswordInDb = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: newPassword,
          }),
        };
        const dbResponse = await fetch(
          "/data/users/password",
          changePasswordInDb
        );

        if (dbResponse.ok) {
          Message("Password successfully changed!");
        } else {
          Message("Oops something went wrong, please try again later");
        }
      } else {
        Message("Oops something went wrong, please try again later");
      }
    } else {
      Message("Email address do not match the logged in user");
    }
  };

  return (
    <>
      {user != null ? (
        <div className="user-update-account">
          <div>
            <h1 className="profile-h1">
              Welcome to your page {userFromDb.email}
            </h1>
            <h1 className="profile-h1">Profile</h1>
          </div>
          <div className="profile-page">
            <form id="register-form" onSubmit={handleSubmit}>
              <div className="account-label">
                <h2 className="profile-h2">Update Password on your Account</h2>
              </div>

              <label className="profile-label">
                Enter Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                  placeholder="email"
                ></input>
              </label>
              <label className="profile-label" htmlFor="confirmPassword">
                {" "}
                Enter New Password
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setUpdateNewPassword(e.target.value)}
                  placeholder="New Password"
                ></input>
              </label>
              <button className="button" type="submit">
                Save Changes
              </button>
              <div className="logout-button-component">
                <button className="button">Log out</button>
              </div>
              <div className="profile-error">{error}</div>
            </form>

            <div className="user-purchase-list">
              <h1 className="profile-h1">Ticket Purchase</h1>
              <div className="concert-list">
                {userevents.map((event) => (
                  <div key={event.event_id} className=" ticket">
                    <div>
                      <h2 className="profile-h2">
                        Booked Event Concert:{event.event_artist}
                      </h2>
                      <h3 className="profile-h3">
                        Event Genre:{event.event_genre}
                      </h3>
                      <h3 className="profile-h3">
                        Address Location:{event.event_address}
                      </h3>
                      <h3 className="profile-h3">
                        Event Date:{event.event_date}
                      </h3>
                      <h3 className="profile-h3">
                        Event Age Limit:{event.event_age_limit}
                      </h3>
                      <h3 className="profile-h3">
                        Event Price:{event.event_price}
                      </h3>
                    </div>
                    <div>
                      <h3 className="profile-h3">About the band</h3>
                      {event.event_description}
                    </div>
                    <div>
                      <img
                        className="profile-image"
                        src={event.event_img_url}
                      />
                    </div>
                    <div className="button-component">
                      <button className="button" type="button">
                        See Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="profile-unauthorized-page">
            <h1>You are not logged in</h1>
            <span>
              Please log in <span className="profile-login-link" onClick={() => setShow(true)}>here</span> to
              see tour profile
            </span>
          </div>
          <ModalComponent
            title="Login"
            onClose={() => setShow(!show)}
            show={show}
          >
            <LoginComponent closeModal={() => setShow(false)} />
          </ModalComponent>
        </>
      )}
    </>
  );
}
export default ProfileComponent;
