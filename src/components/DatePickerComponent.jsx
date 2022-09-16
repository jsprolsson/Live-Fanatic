import { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import eventService from "../services/eventService";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DatePickerComponent.css";

const datepicker = () => {
  const [selectedDateOne, setSelectedDateOne] = useState();
  const [selectedDateTwo, setSelectedDateTwo] = useState();

  const [eventsData, setEventsData] = useState([]);

  //   const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let data = await eventService.getAll();
    setEventsData(data);
    //   setDataLoaded(true);
  }

  console.log(typeof selectedDateOne);
  console.log(typeof selectedDateTwo);

  return (
    <>
      <h2>Sort events by date:</h2>
      <div className="dpdiv">
        <Datepicker
          placeholderText="Select start date"
          value={selectedDateOne}
          onChange={(date) => {
            const d = new Date(date).toLocaleDateString("sv-SE");
            console.log(d);
            setSelectedDateOne(d);
          }}
        
          minDate={new Date()}
        />

        <Datepicker
          
          placeholderText="Select end date"
          value={selectedDateTwo}
          onChange={(date) => {
            const d = new Date(date).toLocaleDateString("sv-SE");
            console.log(d);
            setSelectedDateTwo(d);
          }}
          minDate={new Date(selectedDateOne)}
        />
      </div>

      {eventsData
        .filter(
          (ev) =>
            Date.parse(ev.date) > Date.parse(selectedDateOne) &&
            Date.parse(ev.date) < Date.parse(selectedDateTwo)
        )
        .map((event) => (
          <p key={event.id}>
            {event.date + " "}
            {event.artist + " "}
            {event.venue}
          </p>
        ))}
    </>
  );
};

export default datepicker;
