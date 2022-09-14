import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../styles/CalendarComponent.css";
import eventService from '../services/eventService';

const CalendarComponent = () => {
  const [eventsData, setEventsData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let data = await eventService.getAll()
    setEventsData(data)
    setDataLoaded(true)
    // await fetch('/data/events/')
    //   .then(response => {
    //       return response.json();
    //   })
    //   .then(data => {
    //       console.log(data);
    //       setEventsData(data);
    //       setDataLoaded(true);
    //   })
  }

  return (
    <>
      {!dataLoaded && <p>Loading.....</p>}
      {dataLoaded && eventsData.map((data) => (
        <div className="calendar-cards" key={data.id}>
          <Link to={'/events/' + data.id}>
            <div className="card">
              <div className="date">{data.date}</div>
              <div className="info">
                <div className="artist">{data.artist}</div>
                <div className="location">{data.venue}</div>
                <div className="Tickets">{data.tickets === 0 ? <span id='Sold-out'>Sold Out</span> : data.tickets <= 150 ? <span id='Few-tickets'>Few tickets Available</span> : <span id='Available-tickets'>A Lot Tickets Available</span>}</div>
              </div>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CalendarComponent;
