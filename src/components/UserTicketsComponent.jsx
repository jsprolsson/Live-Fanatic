import { useState, useEffect } from "react";

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
        Booked Event Concert:{event.artist}
      </h2>
      <h3 className="profile-h3">
        Event Genre:{event.genre}
      </h3>
      <h3 className="profile-h3">
        Address Location:{event.address}
      </h3>
      <h3 className="profile-h3">
        Event Date:{event.date}
      </h3>
      <h3 className="profile-h3">
        Event Age Limit:{event.age_limit}
      </h3>
      <h3 className="profile-h3">
        Event Price:{event.price}
      </h3>
    </div>
    <div>
      <h3 className="profile-h3">About the band</h3>
      {event.description}
    </div>
    <div>
      <img
        className="profile-image"
        src={event.img_url}
      />
    </div>
    {expiredTicket ? <div className="button-component">
      <button className="button expired-ticket" type="button">
        EXPIRED
      </button>
    </div> : <div className="button-component">
      <button className="button" type="button">
        Show Ticket
      </button>
    </div>}
    

  </div> );
}
 
export default UserTicketsComponent;