import { Link } from "react-router-dom";
import "../styles/ConfirmBuyComponent.css";
import EventComponent from "./EventComponent";
import PaymentComponent from "./PaymentComponent";
import React from "react";

const ConfirmBuyComponent = () => {
  const [counter, setCounter] = React.useState(7);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  setTimeout(function () {
    window.location = "http://127.0.0.1:5173/";
  }, 7000);

  return (
    <>
      <div onLoad={setTimeout} className="cbmain">
        <h2>Thanks for buying tickets to xxx show</h2>
        <hr></hr>
        <h3>You will be directed home in {counter} seconds</h3>

        
      </div>
    </>
  );
};

export default ConfirmBuyComponent;
