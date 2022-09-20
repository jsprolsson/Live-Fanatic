import '../styles/UserTicketsToEventComponent.css'
import QRCode from 'react-qr-code'

const UserTicketsToEventComponent = ({ ticket, index }) => {
  return (
    <div  className="ticket-container">
      <div className="ticket-header">
      <h3>Ticket #{++index}</h3>
      </div>
      <div className="ticket-info">
      <div className="leftcol">
        <h2>{ticket.artist}</h2>
        <p>Location: {ticket.address}</p>
        <p>Time: {ticket.time}</p>
        <p>Date: {ticket.date}</p>
      </div>
      <div className="rightcol">
        <QRCode className="qr-code" value={ticket.id}/>
      </div>
      </div>
    </div>
  );
};

export default UserTicketsToEventComponent;
