
import "../styles/ConfirmBuyComponent.css";
import React, { useEffect, useState } from "react";
import eventService from "../services/eventService";
import { useNavigate } from "react-router-dom";
import paymentService from "../services/paymentService";

const ConfirmBuyComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseData, setPurchaseData] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    let isCancelled = false
    const getCheckoutResult = async () => {
      let response = await fetch('/data/checkout')
      let result = await response.json()

      if (!isCancelled) {
        if (!result.error) {
          setIsLoading(false)
          setPurchaseData(result.checkoutSession.metadata)
        }
        else {
          setTimeout(() => {
            navigate('/')
          }, 5000);
        }
      }
    }

    getCheckoutResult()
    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    let isCancelled = false
    const updateDatabase = async () => {
      if (!isCancelled) {
        if (purchaseData) {
          const { userId, eventId, amountOfTickets } = purchaseData
          await paymentService.addTicketsToUser(eventId, userId, amountOfTickets)
          setTimeout(() => {
            navigate('/profile')
          }, 10000);
        }
      }
    }

    updateDatabase()
    return () => {
      isCancelled = true
    }
  }, [purchaseData])


  if (isLoading) {
    return <div className="cb-loading-main">
      <div className="cb-loading-container">
        <p className="cb-text">Loading...</p>
      </div>
    </div>
  }


  return (
    <>
      <div className="cb-main">
        <h2>Purchase confirmed</h2>
        <p>Thanks for using live fanatic!</p>
        <hr></hr>
        <h3>You will be directed home in 10 seconds</h3>

      </div>
    </>
  );
};

export default ConfirmBuyComponent;
