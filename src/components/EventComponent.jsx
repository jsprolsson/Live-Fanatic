import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/EventComponent.css'
import PaymentComponent from './PaymentComponent'


const EventComponent = () => {
  const navigate = useNavigate();
  const [livestreamAvailable, setLivestreamAvailable] = useState(false);
  const params = useParams();
  const [eventData, setEventData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


  function fetchData() {
    //add param.id to endpoint when api call working
    fetch(`/data/events/${params.id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        // const id = parseInt(params.id);
        // let event = data.find(event => event.event_id === id)
        // if (event != null) {
        setEventData(data);
        setDataLoaded(true);
        // }
      })
      .catch(error => console.log(error))
  }

  function checkDate() {
    let eventStart = new Date(eventData.event_date)
    eventStart.setHours(eventData.event_time)
    let eventEnd = new Date(eventStart);
    let currentTime = new Date();
    eventEnd.setHours(eventStart.getHours() + 1)

    if (currentTime >= eventStart && !(currentTime > eventEnd)) {
      setLivestreamAvailable(true);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    checkDate();
  }, [eventData])


  return (
    <>
      {!dataLoaded && <p>No event found</p>}
      {dataLoaded && <div className="eventcontainer">
        <div className="event-image">
          <img src={eventData.img_url} alt="artist image" />
        </div>
        <div className="event-date-time">
          <p>{eventData.date}</p>
          <p> {eventData.time}</p>
        </div>
        <div className="right">
          <h2>{eventData.artist}</h2>
          <h3>{eventData.venue}</h3>
          <h4>
            {eventData.address}, {eventData.venue}
          </h4>
          <p>
            <i>{eventData.description}</i>
          </p>
          <p>Age limit: {eventData.event_age_limit}</p>
          <p>Type of event: {eventData.event_type}</p>
          {eventData.type === "livestream" ? <div className="livestream-btn">
            <button onClick={() => { navigate("/livestream/" + eventData.id) }} disabled={!livestreamAvailable ? true : false}>
              {livestreamAvailable ? <span>Go to livestream</span> : <span>Livestream not available</span>}
            </button>
          </div> : <div></div>}
          <div className="eventinfo-audio">
            <div>Listen: </div>
            <audio controls>
              <source
                src="http://localhost:3333/data/audio-example"
                type="audio/mp3"
              />
            </audio>
          </div>
        </div>
      </div>}
      {dataLoaded && <div className="payment">
        <PaymentComponent event={eventData} />
      </div>}

    </>
  );
}

export default EventComponent;