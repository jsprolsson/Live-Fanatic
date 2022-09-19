import eventService from "./eventService";

const getTickets = async (user_Id) => {
    const response = await fetch(`data/user/tickets/${user_Id}`);
    const userTickets = await response.json();
    return userTickets;
}

const addTicketsToUser = async (eventId, userId, amountOfTickets) => {
    const newUserTickets = {
        event_id: eventId,
        user_id: userId,
        tickets: amountOfTickets
      }
  
      const requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserTickets)
      }
  
      const response = await fetch('/data/usertickets', requestOptions)
    
      if(response.ok){
        await removeTicketsFromEvent(eventId, amountOfTickets)
      }
}

const removeTicketsFromEvent = async (eventId, amountOfTickets) => {
    const event = await eventService.getOneEvent(eventId)
    const updatedEvent = { ...event, tickets: event.tickets - amountOfTickets }
    await eventService.update(eventId, updatedEvent)
  }

export default {
    getTickets, addTicketsToUser, removeTicketsFromEvent
}