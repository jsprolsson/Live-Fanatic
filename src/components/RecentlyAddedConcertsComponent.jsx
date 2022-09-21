import { useState, useEffect } from "react";
import "../styles/RecentlyAddedConcertsComponent.css";
import { Link } from "react-router-dom";

const RecentlyAddedConcertsComponent = ({ events }) => {
  return (
    <>
      <div className="recently-added-concerts-container">
        <h2 className="recently-added-headline">Recently added concerts</h2>
        <div className="child-containers">
          {events.map((event) => (
            <Link key={event.id} to={"events/" + event.id}>
              <div
                className="recently-added-wrapper"
                style={{ backgroundImage: `url(${event.img_url})` }}
              >
                <section className="concert-container">
                  <div className="concertArtistDescription">
                    <h4 className="recently-added-artist">{event.artist}</h4>
                  </div>
                  <div className="concertDescription">
                    <span className="recently-added-venue">{event.venue}</span>
                  </div>
                  <div className="concertDate">
                    <span className="recently-added-date"> {event.date}</span>
                  </div>
                </section>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentlyAddedConcertsComponent;
