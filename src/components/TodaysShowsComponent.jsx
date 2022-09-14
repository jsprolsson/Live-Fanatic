import "../styles/TodaysShowsComponent.css";
import { Link } from "react-router-dom";

const TodaysShowsComponent = ({ events }) => {

  return (
    <div className="main">
      {events.map((event) => (
        <Link key={event.event_id} to={"events/" + event.event_id}>
          <div className="subpic">
            <img src={event.event_img_url}></img>
            <div className="cinfo">
              <div className="divcol">
                <h5>{event.event_artist}</h5>
                <h5>{event.event_venue}</h5>
                <h5>{event.event_date}</h5>
              </div>
              <p>{event.event_description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default TodaysShowsComponent;
