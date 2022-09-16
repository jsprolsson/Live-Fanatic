import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import QRCode from 'react-native-qrcode-svg';



function TicketComponent(){
   
  
  const [userTicket, setUserTicket] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  // const [qrvalue, setQrvalue] = useState('');
  
  const useEffect= (()=>{
    const fetchData= async ()=>{
    let requestUserTicket= await fetch ('/data/users/tickets/'+params.id);
    let responsData= await requestUserTicket.json();
    console.log(responsData);
    setUserTicket(responsData);
    };
    fetchData();
  },[]);
  return<>
    <div>
      <h1>User Ticket</h1>
      {/* <QRCode>
          
          value={qrvalue ? qrvalue : 'NA'}
          size={250}
          color="black"
          backgroundColor="white"
          logo={{
            url:
      </QRCode> */}


    </div>
     
   </>
}
export default TicketComponent