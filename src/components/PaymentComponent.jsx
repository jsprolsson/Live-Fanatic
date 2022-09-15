import { useState } from "react";
import "../styles/PaymentComponent.css";
import EventComponent from "./EventComponent";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "./ModalComponent"
import EnterCard from "./EnterCardComponent"
import { useStore } from "../store/useStore"

const PaymentComponent = (props) => {
  const [show, setShow] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(null)
  const navigate = useNavigate();
  const ticketprice = props.event.price;
  const { user } = useStore()


  const displayTickets = props.event.tickets < 200 ? "Few" : "Availible";

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
        "userId": 1,
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

  return (
    <>
      {stripeUrl ? (
        <>
          <div className="payticketsdiv">
            <div className="confirmdiv">
              <h3>Buy {numberOfTicket} tickets to {props.event.artist} for the amount of {totalPrice} Sek?
            </h3>
            
            <a className="paybtn" href={stripeUrl}>
              Confirm buy
            </a>
            </div>
          </div>
        </>
      ) : (
        <div className="payticketsdiv">
          <div className="payhead">
            <h2 className="payh2">Tickets:</h2>
            <div className="payticketschoice">
              <h3>Available:</h3>
              <h3 className="paysetRight">{displayTickets}</h3>

              <h3>Price/ticket incl vat:</h3>
              <h3 className="paysetRight">{ticketprice} Sek</h3>

              <h3>Number of tickets:</h3>

              <div className="paycounter">
                <p></p>
                <button className="paybtn" onClick={removeTicket}>
                  -
                </button>
                <p>{numberOfTicket}</p>
                <button className="paybtn" onClick={addTicket}>
                  +
                </button>
              </div>

              <h3>Total price incl vat:</h3>
              <h3 className="paysetRight">{totalPrice} Sek</h3>
            </div>
            <hr className="payhr"></hr>
            <div className="paytotalPrice">
              <button onClick={buyThroughStripe} className="paybtn">
                Buy
              </button>

              <button onClick={() => navigate(-1)} className="paybtn">
                Cancel
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
