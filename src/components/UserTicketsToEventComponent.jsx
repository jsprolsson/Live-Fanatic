import '../styles/UserTicketsToEventComponent.css'

const UserTicketsToEventComponent = ({ ticket, index }) => {
  return (
    <div  className="ticket">
      <div className="leftcol">
        <h4>Ticket #{++index}</h4>
        <h2>{ticket.artist}</h2>
        <p>Location: {ticket.address}</p>
        <p>Time: {ticket.time}</p>
        <p>Date: {ticket.date}</p>
      </div>
      <div className="rightcol">
        <img
          src="http://quicknet.se/wp-content/uploads/2012/05/qr-code-459x459.png"
          alt="qr code"
        />
      </div>
    </div>
  );
};

export default UserTicketsToEventComponent;
