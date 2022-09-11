import "../styles/ProfileComponent.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'











function ProfileComponent() {

  const user = {
    username: "admin",
    email: "admin@yahoo.com",
    password: "admin123",
    confirmPassword: "admin123"

  }




  useEffect(() => {


  }, []);

  const [username, setUpdateUsername] = useState("");
  const [email, setUpdateEmail] = useState("");
  const [password, setUpdatePassword] = useState("");
  const [confirmPassword, setUpdateConfirmPassword] = useState("");
  const [error, setError] = useState("");








  function Message(message) {
    setError(message)
    setTimeout(() => {
      setError("")
    }, 10000);
  }









  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username) {
      Message("This username is not there or not correct, try again")
    }

    else if (!password) {
      Message("This password is not there or not correct, try again")


    }
    else if (!email) {
      Message("This email is not there or not correct, try again")

    }
    else if (password !== confirmPassword) {
      Message("The password and confirmed password doesent match, try again")
    }
    else {
      Message("You have updated your account!")
    }
  }

  const logOut = () => {
    //navigera till login

  }











  const userEvents = [
    {
      id: 1,
      artist: "Timbaktu:This is life",
      date: "12/02/22",
      time: "20:00",
      location: "Malmö Arena",
      description: "Jason Michael Bosak Diakité, known under the stage name Timbuktu, is Swedish rapper and reggae artist. In the mid-1990s, he started as part of the rap group Excel before going solo as Timbuktu. ",
      tickets: "2",
      url: "https://www.lundagard.se/wp-content/uploads/2014/05/Timbuktu.jpg",
      genre: "Pop",
      agelimit: "15",
      price: "20 EU"
    },
    {
      id: 2,
      artist: "Muse Vinter Concert",
      date: "15/02/22",
      time: "22:00",
      location: "Malmö Arena",
      description: "Muse are always playing the game of escalation. Whenever they head into the studio, the next album needs to be better, and the tour to support it needs to bigger than the last. ",
      tickets: "2",
      url: "https://cdn.wegow.com/media/artists/muse/muse-1541428643.98.2560x1440.jpg",
      genre: "Hard Rock",
      agelimit: "15",
      price: "20 EU"
    },

  ]


  return <>



    <div className="user-updateAccount">
      <div>
        <h1 className="profile-h1">My Profile</h1>

      </div>
      <div className="profile-page">
        <form id='register-form' onSubmit={handleSubmit}>
          {(error != "") ? (<div className="register-error">{error}</div>) : null}
          <div className="account-label">
            <h2 className="profile-h2">Update my Account</h2>
          </div>


          <label className="profile-label">New username
            <input
              type="text"
              name="userName"
              id="userName"
              value={username}
              onChange={(e) => setUpdateUsername(e.target.value)} placeholder="userName">
            </input>

          </label>
          <label className="profile-label">New Email
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setUpdateEmail(e.target.value)} placeholder="email">
            </input>


          </label>
          <label className="profile-label" htmlFor="userName">New Password
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setUpdatePassword(e.target.value)} placeholder="password">
            </input>
          </label>
          <label className="profile-label" htmlFor="confirmPassword">New Confirmed Password
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setUpdateConfirmPassword(e.target.value)} placeholder="confirm Password">
            </input>
          </label>
          <button className="button" type="submit">Save Changes</button>
          <div className="logout-buttoncomponent">
            <button className="button" onClick={logOut}>Log out</button>
          </div>
        </form>
        <div className="user-purchaseList">
          <h1  className="profile-h1">My Purchase</h1>
          <div className="consert-list">
            {userEvents.map((event) => (
              <div className=" ticket">
                <div>
                  <h2 className="profile-h2">Booked Concert:{event.artist}</h2>
                  <h3 className="profile-h3">Genre:{event.genre}</h3>
                  <h3 className="profile-h3">Time:{event.time}</h3>
                  <h3 className="profile-h3">Date:{event.date}</h3>
                  <h3 className="profile-h3">Location:{event.location}</h3>
                  <h3 className="profile-h3">Number of tickets:{event.tickets}</h3>
                  <h3 className="profile-h3">Age Limit:{event.agelimit}</h3>
                  <h3 className="profile-h3">Price:{event.price}</h3>
                </div>
                <div>
                  <h3 className="profile-h3">About the band:</h3>
                  {event.description}
                </div>
                <div>
                  <img className="profile-image" src={event.url} />
                </div>
                <div className="button-component">
                  <button className="button" type="button" >Print Ticket</button>
                </div>
              </div>
            ))};
          </div>
        </div>
      </div>
    </div>
  </>
}
export default ProfileComponent