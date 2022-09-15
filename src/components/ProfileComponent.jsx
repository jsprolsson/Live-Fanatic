import "../styles/ProfileComponent.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'











function ProfileComponent() {
  const [user,setUser]=useState({})
  const [userevents ,setUserEvents] = useState([])
  const [userTickets, setUserTickets] = useState([])
  

  const [email, setUpdateEmail] = useState("");
  const [password, setUpdatePassword] = useState("");
  const [confirmPassword, setUpdateConfirmPassword] = useState("");
  const [error, setError] = useState("");

   //hämta användare
  useEffect( () => {
    const fetchData=async()=>{

     let response = await fetch('/data/login')
     let userdata = await response.json()


     setUser(userdata);

      

        
        
      
       
      
     


    

    
    
    
    //hämta user tickets
     let ticketdata = await fetch(`/data/user/tickets/` + userdata.id);
     
      const ticketjson  = await ticketdata.json();
      console.log(ticketjson)
       setUserTickets(ticketjson);

       //filtrera ut bara ticketsid till egen lista
       const ticketsId = ticketjson.map(({event_id}) => (event_id));

       //fetch alla events
       let eventdata = await fetch('data/events')
       const eventjson = await eventdata.json();

       //filtrera ut bara events usern ska på
       let filteredjson = eventjson.filter(event => ticketsId.includes(event.event_id));

      setUserEvents(filteredjson);
      console.log(filteredjson)
      
    }
    fetchData()
  }, []);

  



  function Message(message) {
    setError(message)
    setTimeout(() => {
      setError("")
    }, 10000);
  }

 
function getUser() {
  
} 








  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      Message("Email is not there or not correct, try again")

    }
    else if (!password) {
      Message("Password is not there or not correct, try again")


    }
    else if (!confirmPassword) {
      Message("Confirmpassword is not there or not correct, try again")


    }

    else if (password !== confirmPassword) {
      Message("The password and confirmed password doesent match, try again")
    }
    else {
      Message("You have updated your account!")
    }
  }

  
  











   const userEvents = [
    {
      id: 1,
      artist: "Timbaktu:This is life",
      date: "12/02/22",
      time: "20:00",
      venue: "Malmö Arena",
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
      venue: "Malmö Arena",
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
        <h1 className="profile-h1">Welcome to your page{user.email}</h1>
        <h1 className="profile-h1">Profile</h1>

      </div>
      <div className="profile-page">
        <form id='register-form' onSubmit={handleSubmit}>
          {(error != "") ? (<div className="register-error">{error}</div>) : null}
          <div className="account-label">
            <h2 className="profile-h2">Update Password on your Account</h2>
          </div>


          
          <label className="profile-label">Enter Email
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setUpdateEmail(e.target.value)} placeholder="email">
            </input>


          </label>
          <label className="profile-label" htmlFor="userName">Enter New Password
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setUpdatePassword(e.target.value)} placeholder="password">
            </input>
          </label>
          <label className="profile-label" htmlFor="confirmPassword"> Enter New Confirmed Password
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
            <button className="button" >Log out</button>
          </div>
        </form>
        <div className="user-purchaseList">
          <h1  className="profile-h1">Ticket Purchase</h1>
          <div className="consert-list">
            {userevents.map((event) => (
              <div key={event.event_id} className=" ticket">
                <div>
                  <h2 className="profile-h2">Booked Event Concert:{event.event_artist}</h2>
                  <h3 className="profile-h3">Event Genre:{event.event_genre}</h3>
                  <h3 className="profile-h3">Adress Location:{event.event_address}</h3>
                  <h3 className="profile-h3">Event Date:{event.event_date}</h3>
                  <h3 className="profile-h3">Event Age Limit:{event.event_age_limit}</h3>
                  <h3 className="profile-h3">Event Price:{event.event_price}</h3>
                  
                </div>
                <div>
                  <h3 className="profile-h3">About the band</h3>
                  {event.event_description}
                </div>
                <div>
                  <img className="profile-image" src={event.event_img_url} />
                </div>
                <div className="button-component">
                  <button className="button" type="button">See Ticket</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
}
export default ProfileComponent