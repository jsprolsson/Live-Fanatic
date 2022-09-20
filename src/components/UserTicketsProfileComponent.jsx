import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const UserTicketsComponent = ({event}) => {
    const [expiredTicket, setExpiredTicket] = useState(false);

    function isExpired(event){
        let todaysDate = new Date();
        let eventDate = new Date(event.date);
        eventDate = eventDate.setHours(event.time);

        if(todaysDate > eventDate) {
            setExpiredTicket(true);
        }
    }


useEffect(() => {
    isExpired(event);
}, [])
    

    return ( <div className=" ticket">
    <div>
      <h2 className="profile-h2">
        {event.artist}
      </h2>
      <h3 className="profile-h3">
        {event.venue}
      </h3>
      <p className="profile-h3">
        {event.address}
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
        EXPIRED
      </button>
    </div> : <div className="button-component">
      <Link to="/ticket" state={{ eventId: event.id }}> <button className="button" id="ticketbutton" type="button">
        Show Ticket
      </button></Link>
      
    </div>}
    

  </div> );
}
 
export default UserTicketsComponent;