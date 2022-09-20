import QRCode from 'react-qr-code'


const UserTicketsToEventComponent = ({ticket, index}) => {

    return ( 
        <div className="ticket">
      <div className="leftcol">
        <h4>Ticket #{++index}</h4>
      <h2>{ticket.artist}</h2>
      <p>Location: {ticket.address}</p>
      <p>Time: {ticket.time}</p>
      <p>Date: {ticket.date}</p>
      </div>
      <div className="rightcol">
        <QRCode value={ticket.id}/>
      </div>
    </div>
     );
}
 
export default UserTicketsToEventComponent;