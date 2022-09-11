import "../styles/CalendarComponent.css";

const CalendarComponent = () => {
  const exampleData = [
    {
      id: 1,
      artist: "Deafhaven",
      location: "Göteborg",
      date: "04-06-2022",
      numberOfTickets: 62547,
    },
    {
      id: 2,
      artist: "King Krule",
      location: "Stockholm",
      date: "04-06-2022",
      numberOfTickets: 140,
    },
    {
      id: 3,
      artist: "Sheer Mag",
      location: "Stockholm",
      date: "04-06-2022",
      numberOfTickets: 0,
    },
  ];

  return (
    <>
      {exampleData.map((data) => (
        <div className="calendar-cards" key={data.id}>
          <div className="card">
            <div className="date">{data.date}</div>
            <div className="info">
              <div className="artist">{data.artist}</div>
              <div className="location">{data.location}</div>
              <div className="Tickets">{data.numberOfTickets === 0? <span id='Sold-out'>Sold Out</span>: data.numberOfTickets <= 150? <span id='Few-tickets'>Few tickets Available</span>: <span id='Available-tickets'>A Lot Tickets Available</span>}</div>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CalendarComponent;
