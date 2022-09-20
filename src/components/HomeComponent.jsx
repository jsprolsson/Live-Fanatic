import "../styles/HomeComponent.css";
import TodaysShowsComponent from "./TodaysShowsComponent";
import RecentlyAddedConcertsComponent from "./RecentlyAddedConcertsComponent";
import { useState, useEffect } from 'react'
import eventService from "../services/eventService";

function HomeComponent() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const loadData = async () => {
      let data = await eventService.getAll()
      setEvents(data)
    }

    loadData()
  }, [])

  const recentlyAddedEvents = events.slice(-3)
  let currentDate = new Date()
  let currentDatePlusMonth =new Date()
  currentDatePlusMonth.setMonth(currentDatePlusMonth.getMonth()+1)

  const eventsInNearFuture = events
  .filter(event => Date.parse(event.date) >= currentDate && Date.parse(event.date) <= currentDatePlusMonth)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    console.log(eventsInNearFuture)

  return (
    <div className="home-main">
      <div className="mainpic">
        <img src="src/assets/Livefanatic.png" alt="" />
      </div>
      <div>
        <RecentlyAddedConcertsComponent events={recentlyAddedEvents} />
        <TodaysShowsComponent events={eventsInNearFuture} />
      </div>
    </div>
  );
}

export default HomeComponent;
