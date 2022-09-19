import {useStore} from '../store/useStore'
import {useParams} from'react-router-dom'
import paymentService from '../services/paymentService';
import {useEffect} from'react'




function TicketComponent(){
  const {user}=useStore();
  const params=useParams();
  
  useEffect(()=>{
  const fetchTickets= async ()=>{
   const userTickets= await paymentService.getTickets(user.id);
   console.log(userTickets);
    
  }
  fetchTickets();
  },[])

  

   
   
  
 

  return(
    <h1>Ticket Component</h1>
     
   )
}
export default TicketComponent