import "../styles/UserTicketsToEventComponent.css";
import QRCode from "react-qr-code";

const UserTicketsToEventComponent = ({ ticket, index }) => {
  return (
    <div className="outercontainer">
      <div className="ticket-container">
        <div className="ticket-header">
          <h3>Ticket #{++index}</h3>
          <div className="leftcol">
            <h2 className="artist-name">{ticket.artist}</h2>
            <p>Location: {ticket.address}</p>
            <p>Time: {ticket.time}</p>
            <p>Date: {ticket.date}</p>
          </div>
        </div>

        <div className="rightcol">
          <QRCode className="qr-code" value={ticket.artist} size={135} />
        </div>
      </div>
    </div>
  );
};

export default UserTicketsToEventComponent;
