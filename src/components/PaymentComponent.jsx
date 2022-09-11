import { useState } from "react";
import "../styles/PaymentComponent.css";
import EventComponent from "./EventComponent";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import ModalComponent from "./ModalComponent"
import EnterCard from "./EnterCardComponent"

const PaymentComponent = ( props ) => {
  const [show, setShow]=useState(false);
  const navigate = useNavigate();
  const ticketprice = props.event.ticketPrice;
  let availibleTickets = 199;
   

  const displayTickets = availibleTickets < 200 ? "Few" : "Availible";

  const [numberOfTicket, setNumberOfTicket] = useState(1);

  const[totalPrice, setTotalPrice]=useState(ticketprice);


  const removeTicket = () => {
    if (numberOfTicket > 1) {
      setNumberOfTicket(numberOfTicket - 1);
      setTotalPrice(totalPrice-ticketprice);
    }
  };

  const addTicket = () => {
    if (numberOfTicket < 10) {
      setNumberOfTicket(numberOfTicket + 1);
      setTotalPrice(totalPrice+ticketprice);
    }
  };

  return (
    <>
      <div className="payticketsdiv">
        <div className="payhead">
          <h2 className="payh2">Tickets:</h2>
          <div className="payticketschoice">
            <h3>Available:</h3>
            <h3 class="paysetRight">{displayTickets}</h3>

            <h3>Price/ticket incl vat:</h3>
            <h3 className="paysetRight">{ticketprice} Sek</h3>

            <h3>Number of tickets:</h3>

            <div className="paycounter">
              <p></p>
              <button class="paybtn" onClick={removeTicket}>
                -
              </button>
              <p>{numberOfTicket}</p>
              <button class="paybtn" onClick={addTicket}>
                +
              </button>
            </div>

            <h3>Total price incl vat:</h3>
            <h3 class="paysetRight">{totalPrice} Sek</h3>
          </div>
          <hr class="payhr"></hr>
          <div className="paytotalPrice">
            <button onClick={() => setShow(true)} class="paybtn">
              Buy
            </button>
            <button onClick={() => navigate(-1)} class="paybtn">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        title="Payment details"
        onClose={() => setShow(false)}
        show={show}
      >
        <EnterCard  price={totalPrice}/>
      </ModalComponent>
    </>
  );
};

export default PaymentComponent;
