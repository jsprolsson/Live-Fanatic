import "../styles/HomeComponent.css";
import TodaysShowsComponent from "./TodaysShowsComponent";
import RecentlyAddedConcertsComponent from "./RecentlyAddedConcertsComponent";
import { useState, useEffect } from 'react'

function HomeComponent() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const loadData = async () => {
      let data = await fetch('/data/events')
      let json = await data.json()

      setEvents(json)
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
