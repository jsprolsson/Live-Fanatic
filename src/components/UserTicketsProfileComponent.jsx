import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'

const UserTicketsComponent = ({event}) => {
  const navigate = useNavigate();
    const [expiredTicket, setExpiredTicket] = useState(false);
    const [livestreamAvailable, setLivestreamAvailable] = useState(false);

    function isExpired(event){
      let eventStart = new Date(event.date)
      eventStart.setHours(event.time)
      let eventEnd = new Date(event.date)
      eventEnd.setHours(eventStart.getHours() + 2)

        if(new Date() > eventEnd) {
            setExpiredTicket(true);
        }
    }

    function checkLivestreamAvailable() {

      if(event.type == 'livestream'){
        let eventStart = new Date(event.date);
        eventStart.setHours(event.time);
        let eventEnd = new Date(eventStart);
        let currentTime = new Date();
        eventEnd.setHours(eventStart.getHours() + 2);
    
        if (currentTime >= eventStart && !(currentTime > eventEnd)) {
          setLivestreamAvailable(true);
        }
    }
    }


useEffect(() => {
    isExpired(event);
    checkLivestreamAvailable()
}, [])

    

    return (  <div className=" ticket">
    <div>
      <h2 className="profile-h2">
        {event.artist}
      </h2>
      { event.type === 'livestream' ? 
      
      <h3 className="profile-h3">
        {event.type} 
      </h3> :
      <>
      <h3 className="profile-h3">
        {event.venue}
      </h3>
      <p className="profile-h3">
        {event.address}
      </p> </>
      }
      <p className="profile-h3">
       {event.time}
      </p>
      <p className="profile-h3">
       {event.date} 
      </p>
      <h3 className="profile-h3">
        Price: {event.price}
      </h3>
      <h3 className="profile-h3">
        Age Limit: {event.age_limit}
      </h3>
    </div>
    
    <div>
      <img
        className="profile-image"
        src={event.img_url}
      />
    </div>
    
    {expiredTicket ? <div className="button-component">
      <button className="button expired-ticket" id="ticketbutton"type="button">
        Expired
      </button>

    </div> : event.type === 'live' ? <div className="button-component">
      <Link to="/ticket" state={{ eventId: event.id }}> <button className="button" id="ticketbutton" type="button">

        Ticket
      </button></Link></div> : <div className="button-component">
        <button className="button" id="ticketbutton" type="button" onClick={() => { navigate("/livestream/" + event.id);}} disabled={!livestreamAvailable ? true : false}>
                    {livestreamAvailable ? (
                      <span>To livestream</span>
                    ) : (
                      <span>Not live yet</span>
                    )}
                  </button></div>}
    

  </div>  ); 
}
 
export default UserTicketsComponent;