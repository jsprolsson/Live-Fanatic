import { useState } from "react";
import "../styles/PaymentComponent.css";
import EventComponent from "./EventComponent";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const PaymentComponent = ({eventId}) => {
  const navigate = useNavigate();
  const ticketprice = 555;
  let availibleTickets = 200;
  const [displayTickets, setDisplayTickets] = useState("Availible");
  const [numberOfTicket, setNumberOfTicket] = useState(1);

  if (availibleTickets < 200) {
    setDisplayTickets("Few");
  }

  const removeTicket = () => {
    if (numberOfTicket > 1) {
      setNumberOfTicket(numberOfTicket - 1);
    }
  };

  const addTicket = () => {
    if (numberOfTicket < 10) {
      setNumberOfTicket(numberOfTicket + 1);
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
            <h3 class="paysetRight">{numberOfTicket * ticketprice} Sek</h3>
          </div>
          <hr class="payhr"></hr>
          <div className="paytotalPrice">
            <button class="paybtn">Buy</button>
            <button onClick={() => navigate(-1)} class="paybtn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
