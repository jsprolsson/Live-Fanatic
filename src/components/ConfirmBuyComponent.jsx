
import "../styles/ConfirmBuyComponent.css";
import React, { useEffect, useState } from "react";
import eventService from "../services/eventService";
import { useNavigate } from "react-router-dom";

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
          await removeTicketsFromEvent(eventId, amountOfTickets)
          await addTicketsToUser(eventId, userId, amountOfTickets)
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

  const generateId = () => Math.floor(Math.random() * 1000000)

  const removeTicketsFromEvent = async (eventId, amountOfTickets) => {
    const event = await eventService.getOneEvent(eventId)
    const updatedEvent = { ...event, tickets: event.tickets - amountOfTickets }
    await eventService.update(eventId, updatedEvent)
  }

  const addTicketsToUser = async (eventId, userId, amountOfTickets) => {
    const newUserTickets = {
      id: generateId(),
      event_id: eventId,
      user_id: userId,
      tickets: amountOfTickets
    }


    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserTickets)
    }

    await fetch('/data/usertickets', requestOptions)
  }

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
