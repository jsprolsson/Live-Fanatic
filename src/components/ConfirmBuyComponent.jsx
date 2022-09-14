
import "../styles/ConfirmBuyComponent.css";
import React, { useEffect, useState } from "react";
import eventService from "../services/eventService";

const ConfirmBuyComponent = () => {
  const [counter, setCounter] = useState(7);
  const [paymentMetadata, setPaymentMetadata] = useState(null)

  async function getCheckoutResult() {
    let response = await fetch('/data/checkout')
    console.log('response', response)
    let result = await response.json()
    console.log('result', result)
    setPaymentMetada(result)
  }

  useEffect(() => {
    getCheckoutResult()
  }, [])


  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // setTimeout(function () {
  //   window.location = "http://127.0.0.1:5173/";
  // }, 30000);

  if (condition) {

  }

  return (
    <>
      <div onLoad={setTimeout} className="cbmain">
        <h2>Purchase confirmed</h2>
        <p>Thanks for using live fanatic!</p>
        <hr></hr>
        <h3>You will be directed home in {counter} seconds</h3>


      </div>
    </>
  );
};

export default ConfirmBuyComponent;
