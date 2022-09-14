import "../styles/TodaysShowsComponent.css";
import { Link } from "react-router-dom";

const TodaysShowsComponent = ({ events }) => {

  return (
    <div className="main">
      {events.map((event) => (
        <Link key={event.id} to={"events/" + event.id}>
          <div className="subpic">
            <img src={event.img_url}></img>
            <div className="cinfo">
              <div className="divcol">
                <h5>{event.artist}</h5>
                <h5>{event.venue}</h5>
                <h5>{event.date}</h5>
              </div>
              <p>{event.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default TodaysShowsComponent;
