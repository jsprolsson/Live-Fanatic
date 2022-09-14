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

  return (
    <div className="main">
      <div className="mainpic">
        <img src="src/assets/Livefanatic.png" alt="" />
      </div>
      <div>
        <RecentlyAddedConcertsComponent events={recentlyAddedEvents} />
        <TodaysShowsComponent events={events} />
      </div>
    </div>
  );
}

export default HomeComponent;
