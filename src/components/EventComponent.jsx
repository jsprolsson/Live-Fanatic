import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EventComponent.css";
import PaymentComponent from "./PaymentComponent";
import { useStore } from "../store/useStore";
import ModalComponent from "./ModalComponent";
import LoginComponent from "./LogInComponent";

const TicketOptions = ({ show, data }) => {
  if (show) {
    return <PaymentComponent event={data} />;
  } else {
    return null;
  }
};

const ShowTicketOptions = ({ user, show, data, handleClick }) => {
  if (data.tickets > 0) {
    if (user !== null) {
      return <TicketOptions show={!show} data={data} />
    } else {
      return <button
        id="event-toggle-modal-btn"
        onClick={() => handleClick(true)}
      >
        Login to purchase tickets
      </button>
    }
  } else {
    return null
  }
}

const EventComponent = () => {
  const navigate = useNavigate();
  const [livestreamAvailable, setLivestreamAvailable] = useState(false);
  const params = useParams();
  const [eventData, setEventData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const { user } = useStore();

  function fetchData() {
    fetch(`/data/events/${params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setEventData(data);
        setDataLoaded(true);
        // }
      })
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    fetchData();
  }, []);


  const randomizeAudioStreamId = Math.floor(Math.random() * (2 - 1 + 1) + 1);

  return (
    <>
      {!dataLoaded && <p>No event found</p>}
      {dataLoaded && (
        <div className="eventcontainer">
          <div className="event-container-desktop">
            <div className="event-image">
              <img src={eventData.img_url} alt="artist image" />
            </div>
            <div className="venue-info-1">
              {eventData.tickets == 0 ? (<h1 className="sold-out">Sold out!</h1>): (<div></div>)}
              <h2>{eventData.artist}</h2>
              <h3>{eventData.venue}</h3>
              <h4>
                {eventData.address}
              </h4>
              <p> kl. {eventData.time}</p>
              <p>{eventData.date}</p>
              <div className="venue-info-2">
                <p>
                  <i>{eventData.description}</i>
                </p>
                <p>Age limit: {eventData.age_limit}</p>
                <p>Type of event: {eventData.type}</p>
              </div>
              <div className="eventinfo-audio">
                <audio controls>
                  <source
                    src={`http://localhost:3333/data/audio-stream/${randomizeAudioStreamId}`}
                    type="audio/mp3"
                  />
                </audio>
              </div>
            </div>
          </div>
          <ShowTicketOptions
            data={eventData}
            show={toggleLoginModal}
            user={user}
            handleClick={setToggleLoginModal} />
        </div>
      )}
      <ModalComponent
        title="login"
        show={toggleLoginModal}
        onClose={() => setToggleLoginModal(false)}
      >
        <LoginComponent closeModal={() => setToggleLoginModal(false)} />
      </ModalComponent>
    </>
  );
};

export default EventComponent;
