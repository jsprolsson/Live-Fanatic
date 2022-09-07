import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import '../styles/EventComponent.css'

const EventComponent = () => {
    const params = useParams();
    // get ID from calendar with useparams.
    //fetch event from backend api.
    
    const [eventData, setEventData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData(){
        fetch('http://localhost:3333/data/event/' + params.id)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setEventData(data);
            setDataLoaded(true);
        })
        
    }

    
    return (
    <div className="container split">
                <div className="eventImage">
                <img src={eventData.imageUrl} alt="artist image" />
                </div>
                <div className="datetime">
                <p>{eventData.date}</p>
                <p> {eventData.time}</p>
            </div>
            <div className="right">
                <h2>{eventData.artist}</h2>
                <h3>{eventData.venue}</h3>
                <h4>{eventData.address}, {eventData.city}</h4>
                <p><i>{eventData.description}</i></p>
                <p>Age limit: {eventData.ageLimit}</p>
            </div>
        </div>
     );
}
 
export default EventComponent;