import {useStore} from '../store/useStore'
import {useLocation} from'react-router-dom'
import paymentService from '../services/paymentService';
import {useEffect, useState} from'react'
import eventService from '../services/eventService';
import UserTicketsToEventComponent from './UserTicketsToEventComponent';
import '../styles/UserTicketsToEventComponent.css'




function TicketComponent(){
  const [userTickets, setUserTickets] = useState([]);
  const {user}=useStore();
  const location = useLocation()
  const eventId = location.state
  const Print = () => {
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  
  useEffect(()=>{
    let isCancelled = false;
  const fetchTickets= async ()=>{
    //hämta användarens köp
    const userPurchases = await paymentService.getTickets(user.id);
   
    //filtrera ut det köpet som ska visas baserat på eventID
    const userPurchase = userPurchases.filter(ticketen => ticketen.event_id === eventId.eventId)

    if(!isCancelled){
      const ticketArray = []
      const eventInfo = await eventService.getOneEvent(eventId.eventId)
  
      //fyll en lista med så många "biljetter" köpet säger att användaren har köpt
      for(let i = 0; i < userPurchase[0].tickets; i++){
        ticketArray.push(eventInfo)
      }
      setUserTickets(ticketArray)
    }

  }
  fetchTickets();
  return () => {
    isCancelled = true
  }
  },[])

 

  return (
    <>
      <div id="printablediv">
        {userTickets.map((ticket, index) => (
          <UserTicketsToEventComponent
            key={index}
            ticket={ticket}
            index={index}
          />
        ))}
      </div>
      <div className="button-container">
      <button type="button" id="print-button" onClick={Print}>
        {" "}
        Print tickets
      </button></div>
    </>
  );
   
}
export default TicketComponent