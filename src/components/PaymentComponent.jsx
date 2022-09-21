import { useState } from "react";
import "../styles/PaymentComponent.css";
import EventComponent from "./EventComponent";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "./ModalComponent"
import EnterCard from "./EnterCardComponent"
import { useStore } from "../store/useStore"
import DatePickerComponent from "./DatePickerComponent";

const PaymentComponent = (props) => {
  const [show, setShow] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(null)
  const navigate = useNavigate();
  const ticketprice = props.event.price;
  const { user } = useStore()

  let displayTickets;

  if (props.event.tickets > 150) {
    displayTickets = "Available"
  } else if (props.event.tickets > 0) {
    displayTickets = "Few"
  } else {
    displayTickets = "Sold Out"
  }

  const [numberOfTicket, setNumberOfTicket] = useState(1);

  const [totalPrice, setTotalPrice] = useState(ticketprice);

  const removeTicket = () => {
    if (numberOfTicket > 1) {
      setNumberOfTicket(numberOfTicket - 1);
      setTotalPrice(totalPrice - ticketprice);
    }
  };

  const addTicket = () => {
    if (numberOfTicket < 10) {
      setNumberOfTicket(numberOfTicket + 1);
      setTotalPrice(totalPrice + ticketprice);
    }
  };

  const buyThroughStripe = async () => {
    const body = {
      "items": [
        {
          "description": props.event.artist,
          "price": props.event.price,
          "quantity": numberOfTicket
        }
      ],
      "orderDetails": {
        "userId": user.id,
        "eventId": props.event.id,
        "amountOfTickets": numberOfTicket
      }
    }

    let response = await fetch('/data/checkout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    let result = await response.json()

    if (result.url) {
      setStripeUrl(result.url)
    }
  }

  const liveStream = props.event.type === 'livestream'

  return (
    <>
      {stripeUrl ? (
        <>
          <div className="payticketsdiv">
            <div className="confirmdiv">
              <h3>
                Buy {numberOfTicket} tickets to {props.event.artist} on{" "}
                {props.event.venue} {props.event.date} for the amount of{" "}
                {totalPrice} Sek?
              </h3>

              <div id="stripe-btns">
                <a id="pay-confirm-buy" href={stripeUrl}>
                  Confirm
                </a>
                <button onClick={() => navigate(0)} id="pay-cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="payticketsdiv">
          <div className="payhead">
            <h2 className="payh2">Tickets:</h2>
            <div className="payticketschoice">
              <h3>Ticket status:</h3>
              <h3 className="paysetRight">{displayTickets}</h3>

              <h3>Price/ticket incl vat:</h3>
              <h3 className="paysetRight">{ticketprice} Sek</h3>

              <h3>Number of tickets:</h3>

              {liveStream ? <p id="pay-livestream-info">Livestreams are limited to one ticket only.</p> : <div className="paycounter">
                <p></p>
                <button disabled={liveStream} className="paybtn" onClick={removeTicket}>
                  -
                </button>
                <p id="pay-amountoftickets">
                  {numberOfTicket}
                </p>
                <button disabled={liveStream} className="paybtn" onClick={addTicket}>
                  +
                </button>
              </div>}

              <h3>Total price incl vat:</h3>
              <h3 className="paysetRight">{totalPrice} Sek</h3>
            </div>
            <hr className="payhr"></hr>
            <div className="paytotalPrice">
              <button onClick={buyThroughStripe} id="pay-continue-btn">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalComponent
        title="Payment details"
        onClose={() => setShow(false)}
        show={show}
      >
        <EnterCard price={totalPrice} />
      </ModalComponent>
    </>
  );
};

export default PaymentComponent;
