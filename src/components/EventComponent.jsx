import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import '../styles/EventComponent.css'
import PaymentComponent from './PaymentComponent'


const EventComponent = () => {
    const navigate = useNavigate();
    const [livestreamAvailable, setLivestreamAvailable] = useState(false);
    // const params = useParams();
    // const [eventData, setEventData] = useState({});
    // const [dataLoaded, setDataLoaded] = useState(false);


    // useEffect(() => {
    //     fetchData()
    // }, [])

    // function fetchData(){
    //     fetch('http://localhost:3333/data/event/' + params.id)
    //     .then(response => {
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data)
    //         setEventData(data);
    //         setDataLoaded(true);
    //     })
    // }

    function checkDate() {
        let eventStart = new Date(eventData.date);
        eventStart.setHours(eventData.time);
        let currentTime = new Date();
        let eventEnd = new Date(eventStart);
        eventEnd.setHours(eventStart.getHours() + 1)
        console.log(eventStart)
        console.log(eventEnd)
        
        if(currentTime >= eventStart && !(currentTime > eventEnd)) {
            setLivestreamAvailable(true);
        }
    }

    useEffect(() => {
        checkDate();
    }, [])

    const eventData = {
            "id":5,
            "artist": "Kendrick Lamar",
            "imageUrl": "data:image/jpeg;base64,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",
            "description": "Lorem ipsum, dolor. Libero corporis  distinctio numquam, itaque eveniet omnis cumque adipisci labore ab eaque pariatur?",
            "venue": "Annexet",
            "city": "Stockholm",
            "address": "Tågeholmsgatan 49B",
            "time": "20.00",
            "date": "2022-11-25",
            "typeOfEvent": "livestream",
            "ageLimit": 13,
            "ticketPrice":555,
        }

    
    return (
      <>
        <div className="eventcontainer">
          <div className="eventImage">
            <img src={eventData.imageUrl} alt="artist image" />
          </div>
          <div className="eventDateTime">
            <p>{eventData.date}</p>
            <p> {eventData.time}</p>
          </div>
          <div className="right">
            <h2>{eventData.artist}</h2>
            <h3>{eventData.venue}</h3>
            <h4>
              {eventData.address}, {eventData.city}
            </h4>
            <p>
              <i>{eventData.description}</i>
            </p>
            <p>Age limit: {eventData.ageLimit}</p>
            <p>Type of event: {eventData.typeOfEvent}</p>
            {eventData.typeOfEvent === "livestream" ? <div className="livestream-btn">
                <button onClick={() => {navigate("/livestream/" +eventData.id )}} disabled={!livestreamAvailable ? true : false }>
                    {livestreamAvailable ? <span>Go to livestream</span> : <span>Livestream not available</span>}
                </button>
            </div> : <div></div>}
          </div>
        </div>
        <div className="payment">
        <PaymentComponent eventId={eventData.id} />
        </div>
      </>
    );
}
 
export default EventComponent;