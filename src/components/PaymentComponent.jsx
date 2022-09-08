import { useState } from "react";
import "../styles/PaymentComponent.css";
import EventComponent from "./EventComponent";

const PaymentComponent = () => {
  const ticketprice = 555;
  const [numberOfTicket, setNumberOfTicket] = useState(1);

  const removeTicket = () => {
    if (numberOfTicket > 1) {
      setNumberOfTicket(numberOfTicket - 1);
    }
  };

  const addTicket = () => {
    if (numberOfTicket < 10) setNumberOfTicket(numberOfTicket + 1);
  };

  return (
    <>
      <div className="event">
        <EventComponent />
      </div>

      <div className="ticketsdiv">
        <div className="head">
          <h2>Tickets:</h2>
          <div className="ticketschoice">
            <h3>Available:</h3>
            <h3 class="setRight">Few/many</h3>

            <h3>Price/ticket incl vat:</h3>
            <h3 className="setRight">{ticketprice} Sek</h3>

            <h3>Number of tickets:</h3>

            <div className="counter">
              <p></p>
              <button onClick={removeTicket}>-</button>
              <p>{numberOfTicket}</p>
              <button onClick={addTicket}>+</button>
            </div>

            <h3>Total price incl vat:</h3>
            <h3 class="setRight">{numberOfTicket * ticketprice} Sek</h3>
          </div>
          <hr></hr>
          <div className="totalPrice">
            <button class="btn">Buy</button>
            <button class="btn" >Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
