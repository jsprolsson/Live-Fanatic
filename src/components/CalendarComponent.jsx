import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CalendarComponent.css";
import eventService from "../services/eventService";

const CalendarComponent = () => {
  const [eventsData, setEventsData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  let navigate = useNavigate();
  let currentDate = new Date();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let data = await eventService.getAll();
    let filteredEvents = data
      .filter((event) => {
        let eventStart = new Date(event.date)
        eventStart.setHours(event.time)
        let eventEnd = new Date(event.date)
        eventEnd.setHours(eventStart.getHours() + 2)

        if(eventEnd > new Date()) {
            return true;
        }
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));   
    setEventsData(filteredEvents);
    setDataLoaded(true);
  }

  return (
    <>
      {!dataLoaded && <p>Loading.....</p>}
      {dataLoaded &&
        eventsData.map((data) => (
          <div className="calendar-cards" key={data.id}>
            <Link to={"/events/" + data.id}>
              <div className="card">
                <div className="date">{data.date}</div>
                <div className="info">
                  <div className="artist">{data.artist}</div>
                  <div className="location">{data.venue}</div>
                  <div className="Tickets">
                    {data.tickets === 0 ? (
                      <span id="Sold-out">Sold Out</span>
                    ) : data.tickets <= 150 ? (
                      <span id="Few-tickets">Few tickets Available</span>
                    ) : (
                      <span id="Available-tickets">Tickets Available</span>
                    )}
                  </div>
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
