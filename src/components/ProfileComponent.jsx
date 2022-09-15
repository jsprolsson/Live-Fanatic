import "../styles/ProfileComponent.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {
  const [user, setUser] = useState({});
  const [userevents, setUserEvents] = useState([]);
  const [userTickets, setUserTickets] = useState([]);

  const [email, setUpdateEmail] = useState("");
  const [newPassword, setUpdateNewPassword] = useState("");
  const [error, setError] = useState("");

  //hämta användare
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/data/login");
      let userdata = await response.json();

      setUser(userdata);

      //hämta user tickets
      let ticketdata = await fetch(`/data/user/tickets/` + userdata.id);

      const ticketjson = await ticketdata.json();

      setUserTickets(ticketjson);

      //filtrera ut bara ticketsid till egen lista
      const ticketsId = ticketjson.map(({ event_id }) => event_id);

      //fetch alla events
      let eventdata = await fetch("data/events");
      const eventjson = await eventdata.json();

      //filtrera ut bara events usern ska på
      let filteredjson = eventjson.filter((event) =>
        ticketsId.includes(event.event_id)
      );

      setUserEvents(filteredjson);
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
    const response = await fetch("/data/users/password", requestChangePassword);

    if (response.status == 200) {
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

      if (dbResponse.status == 200) {
        Message("Password successfully changed!");
      } else {
        Message("Oops something went wrong");
      }
    } else {
      Message(response.status.toString());
    }
  };

  return (
    <>
      <div className="user-updateAccount">
        <div>
          <h1 className="profile-h1">Welcome to your page {user.email}</h1>
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
            <div className="logout-buttoncomponent">
              <button className="button">Log out</button>
            </div>
            <p className="register-error">{error}</p>
          </form>

          <div className="user-purchaseList">
            <h1 className="profile-h1">Ticket Purchase</h1>
            <div className="consert-list">
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
                      Adress Location:{event.event_address}
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
                    <img className="profile-image" src={event.event_img_url} />
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
    </>
  );
}
export default ProfileComponent;
