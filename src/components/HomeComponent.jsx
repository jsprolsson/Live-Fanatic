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

  return (
    <div className="main">
      <div className="mainpic">
        <img src="src/assets/Livefanatic.png" alt="" />
      </div>
      <div>
        <RecentlyAddedConcertsComponent events={events} />
        <TodaysShowsComponent />
      </div>
    </div>
  );
}

export default HomeComponent;
