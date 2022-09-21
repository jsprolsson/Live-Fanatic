import "../styles/ProfileComponent.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import paymentService from "../services/paymentService";
import eventService from "../services/eventService";
import { useStore } from "../store/useStore";
import ModalComponent from "./ModalComponent";
import LoginComponent from "./LogInComponent";
import UserTicketsProfileComponent from "./UserTicketsProfileComponent";
import userService from "../services/userservice";

function ProfileComponent() {
  const [userFromDb, setUserFromDb] = useState({});
  const [userevents, setUserEvents] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [email, setUpdateEmail] = useState("");
  const [newPassword, setUpdateNewPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useStore();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  //hämta användare
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      if (!isCancelled) {
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
        let filteredEventsList = allEvents
          .filter((event) => ticketsIds.includes(event.id))
          .sort((a, b) => {
            return a.date > b.date ? 1 : -1;
          });

        // lägg till utgånga biljetter i egen lista
        let expiredTickets = filteredEventsList
          .filter((event) => {
            let eventStart = new Date(event.date);
            eventStart.setHours(event.time);
            let eventEnd = new Date(event.date);
            eventEnd.setHours(eventStart.getHours() + 2);

            if (eventEnd < new Date()) {
              return true;
            }
          })
          .splice(-3);

        //ta bort utgånga biljetter från listan med userns event
        filteredEventsList = filteredEventsList.filter((event) => {
          let eventStart = new Date(event.date);
          eventStart.setHours(event.time);
          let eventEnd = new Date(event.date);
          eventEnd.setHours(eventStart.getHours() + 2);

          if (eventEnd >= new Date()) {
            return true;
          }
        });

        //lägg till utgånga events i slutet av listan för att separera aktuella och utgånga biljetter
        const sortedUsersEventList = filteredEventsList.concat(expiredTickets);

        setUserEvents(sortedUsersEventList);
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [user]);

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

  const login = async () => {
    setUser(null);
    navigate("/");
    await userService.logout();
  };

  const seeTicket = () => {
    navigate("/ticketComponent");
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

  const closeProfileModal = () => {
    setShow(false);
  };

  return (
    <>
      {user != null ? (
        <div className="user-update-account">
          <div>
            <h1 className="profile-h1">Your profile</h1>
          </div>
          <div className="profile-page">
            <div className="register-details">
              <form id="register-form" onSubmit={handleSubmit}>
                <div className="account-label">
                  <h2 className="profile-h2">Update your password</h2>
                </div>

                <label className="profile-label">
                  Enter Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                    placeholder="Email"
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
                <div className="profile-error">{error}</div>
              </form>
              <div className="logout-button-component">
                <button className="button-logout" onClick={login}>
                  Log Out
                </button>
              </div>
            </div>
            <div className="user-purchase-list">
              <h1 className="profile-h1">Your tickets</h1>
              <div className="concert-list">
                {userevents.map((events) => (
                  <UserTicketsProfileComponent key={events.id} event={events} />
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
              Please login{" "}
              <span
                className="profile-login-link"
                onClick={() => setShow(true)}
              >
                here
              </span>{" "}
              to see tour profile
            </span>
          </div>
          <ModalComponent
            title="Login"
            onClose={() => setShow(!show)}
            show={show}
          >
            <LoginComponent closeModal={closeProfileModal} />
          </ModalComponent>
        </>
      )}
    </>
  );
}
export default ProfileComponent;
