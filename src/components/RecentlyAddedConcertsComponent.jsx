import { useState, useEffect } from 'react'
import '../styles/RecentlyAddedConcertsComponent.css'
import { Link } from "react-router-dom";

const RecentlyAddedConcertsComponent = ({ events }) => {

  return (
    <>
      <div className="recently-added-concerts-container">
        <h2 className="concertstext">Recently added concerts</h2>
        <div className="child-containers">
          {events.map((event) => (
            <Link to={"events/" + event.id}>
              <div
                key={event.id}
                className="recently-added-wrapper"
                style={{ backgroundImage: `url(${event.img_url})` }}
              >
                <section className="concert-container">
                  <h4 className="concertstext">{event.artist}</h4>
                  <span className="concertstext">{event.description}</span>
                  <span className="concertstext"> {event.date}</span>
                </section>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecentlyAddedConcertsComponent;