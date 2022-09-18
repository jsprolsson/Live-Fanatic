import "../styles/ProfileComponent.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import paymentService from "../services/paymentService";
import eventService from "../services/eventService";
import { useStore } from "../store/useStore";
import ModalComponent from "./ModalComponent";
import LoginComponent from "./LogInComponent";
import UserTicketsComponent from "./UserTicketsComponent";

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
    let isCancelled = false
    const fetchData = async () => {
      if(!isCancelled) {
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

      //filtrera ut bara events usern ska på och sortera efter datum
      let filteredEventsList = allEvents.filter((event) =>
        ticketsIds.includes(event.id)
      ).sort((a,b) => {
          return a.date > b.date ? 1 : -1;
      })
      
      // lägg till utgånga biljetter i egen lista
      let expiredTickets = filteredEventsList.filter(event => Date.parse(event.date) < new Date()).splice(-3)

      //ta bort utgånga biljetter från listan med userns event
      filteredEventsList = filteredEventsList.filter(event => Date.parse(event.date) > new Date())

      //lägg till utgånga events i slutet av listan för att separera aktuella och utgånga biljetter
      const sortedUsersEventList = filteredEventsList.concat(expiredTickets)

      setUserEvents(sortedUsersEventList);
    }
    };
    fetchData();
    return () => {
      isCancelled = true
    }
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
                {userevents.map((events) => (
                  <UserTicketsComponent key={events.id} event={events}/>
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
